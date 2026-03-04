'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { updateProduct, toggleProductSoldStatus, deleteProduct } from '@/app/admin/actions';

interface ProductRowProps {
    product: any;
    isSelected: boolean;
    onToggleSelect: (id: number) => void;
}

export default function ProductRow({ product, isSelected, onToggleSelect }: ProductRowProps) {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [localProduct, setLocalProduct] = useState(product);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingField && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingField]);

    const startEdit = (field: string, value: string) => {
        setEditingField(field);
        setEditValue(String(value));
    };

    const cancelEdit = () => {
        setEditingField(null);
        setEditValue('');
    };

    const saveEdit = async () => {
        if (!editingField || isLoading) return;
        setIsLoading(true);

        try {
            const update: any = {};
            if (editingField === 'price') {
                update.price = Number(editValue);
            } else {
                update[editingField] = editValue;
            }

            // Optimistic update
            setLocalProduct({ ...localProduct, ...update });
            await updateProduct(localProduct.id, update);
        } catch (err) {
            setLocalProduct(product); // Revert on error
        } finally {
            setIsLoading(false);
            setEditingField(null);
            setEditValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') cancelEdit();
    };

    const handleToggleSold = async () => {
        setIsLoading(true);
        setLocalProduct({ ...localProduct, is_sold: !localProduct.is_sold });
        try {
            await toggleProductSoldStatus(localProduct.id, localProduct.is_sold);
        } catch {
            setLocalProduct(product);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('PERMANENT DELETE. Are you sure?')) return;
        setIsLoading(true);
        try {
            await deleteProduct(localProduct.id);
        } catch {
            setIsLoading(false);
        }
    };

    const renderCell = (field: string, value: string, displayValue?: string) => {
        if (editingField === field) {
            return (
                <input
                    ref={inputRef}
                    type={field === 'price' ? 'number' : 'text'}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={saveEdit}
                    className="bg-ink border border-electric/50 text-white px-2 py-1 font-mono text-xs w-full outline-none focus:border-electric"
                />
            );
        }
        return (
            <span
                onDoubleClick={() => startEdit(field, String(value))}
                className="cursor-text hover:text-electric transition-colors"
                title="Double-click to edit"
            >
                {displayValue || value}
            </span>
        );
    };

    return (
        <tr className={`transition-colors ${isSelected ? 'bg-electric/5' : 'hover:bg-ash/5'} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Checkbox */}
            <td className="p-4 w-10">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(localProduct.id)}
                    className="w-4 h-4 accent-electric cursor-pointer"
                />
            </td>
            {/* ID */}
            <td className="p-4 text-ash/40 font-mono text-[10px]">#{localProduct.id}</td>
            {/* Item */}
            <td className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-ink relative border border-ash/10 overflow-hidden shrink-0">
                    <Image src={localProduct.image_url} alt={localProduct.title} fill className="object-cover" />
                </div>
                {renderCell('title', localProduct.title)}
            </td>
            {/* Price */}
            <td className="p-4">
                {renderCell('price', localProduct.price, `₹${localProduct.price}`)}
            </td>
            {/* Category / Size */}
            <td className="p-4 text-ash/60">
                {renderCell('category', localProduct.category)} / {renderCell('size', localProduct.size)}
            </td>
            {/* Status */}
            <td className="p-4">
                <button
                    onClick={handleToggleSold}
                    className={`px-2 py-1 text-[9px] uppercase tracking-widest cursor-pointer transition-all ${localProduct.is_sold ? 'bg-rust/20 text-rust border border-rust/30 hover:bg-rust/30' : 'bg-electric/20 text-electric border border-electric/30 hover:bg-electric/30'}`}
                >
                    {localProduct.is_sold ? 'SOLD OUT' : 'AVAILABLE'}
                </button>
            </td>
            {/* Actions */}
            <td className="p-4 text-right">
                <button
                    onClick={handleDelete}
                    className="text-rust/70 hover:text-rust transition-colors uppercase tracking-widest text-[10px] cursor-pointer"
                >
                    DEL
                </button>
            </td>
        </tr>
    );
}
