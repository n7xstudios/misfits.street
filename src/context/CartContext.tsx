import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CartItem {
    id: number;
    title: string;
    price: string;
    image: string;
}

interface CartContextValue {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = useCallback((item: CartItem) => {
        setItems(prev => {
            if (prev.find(i => i.id === item.id)) return prev;
            return [...prev, item];
        });
    }, []);

    const removeItem = useCallback((id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
    }, []);

    const toggleCart = useCallback(() => setIsOpen(p => !p), []);
    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);

    return (
        <CartContext.Provider value={{ items, isOpen, addItem, removeItem, toggleCart, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
};
