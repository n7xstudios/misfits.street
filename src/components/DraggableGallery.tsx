import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

// Register Draggable locally to be safe, though usually global is better
gsap.registerPlugin(Draggable);

interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  position: { x: number, y: number };
}

const products: Product[] = [
  { id: 1, title: "Utility Bomber_v2", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80", price: "$240", position: { x: 100, y: 100 } },
  { id: 2, title: "Acid Wash Tee", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", price: "$85", position: { x: 400, y: 200 } },
  { id: 3, title: "Cargo Pant_MK3", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80", price: "$180", position: { x: 200, y: 450 } },
];

const DraggableGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Make items draggable
    Draggable.create(".product-card", {
      type: "x,y",
      bounds: containerRef.current,
      edgeResistance: 0.65,
      // inertia: true, // Requires InertiaPlugin (paid), omitted for safety
      onDragStart: function() {
        gsap.to(this.target, { scale: 1.05, duration: 0.2, zIndex: 100, boxShadow: "0px 20px 40px rgba(0,0,0,0.5)" });
      },
      onDragEnd: function() {
        gsap.to(this.target, { scale: 1, duration: 0.3, zIndex: 1, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" });
      }
    });

    // Initial stagger animation
    gsap.from(".product-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.5
    });
    
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-transparent overflow-hidden border-t-2 border-neon-green">
      <div className="absolute top-4 left-4 text-neon-green font-mono uppercase text-sm tracking-widest z-0 pointer-events-none">
        // Desktop_Zone_Alpha
        <br />
        // Drag_To_Inspec
      </div>

      {products.map((product) => (
        <div 
          key={product.id}
          className="product-card absolute bg-charcoal border border-concrete-white w-64 md:w-80 shadow-2xl cursor-grab active:cursor-grabbing"
          style={{ top: product.position.y, left: product.position.x }}
        >
          {/* OS Title Bar */}
          <div className="bg-concrete-white text-charcoal px-2 py-1 flex justify-between items-center text-xs font-bold font-mono border-b border-charcoal">
            <span>{product.title}</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-charcoal rounded-full"></div>
              <div className="w-2 h-2 border border-charcoal rounded-full"></div>
            </div>
          </div>
          
          {/* Image */}
          <div className="p-2 relative group">
            <div className="overflow-hidden bg-gray-800 aspect-[3/4] relative">
               {/* Noise overlay on image */}
               <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay z-10"></div>
               <img 
                 src={product.image} 
                 alt={product.title} 
                 className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                 draggable={false}
               />
               
               {/* Price Tag Overlay */}
               <div className="absolute bottom-2 right-2 bg-neon-green text-charcoal px-2 py-0 text-lg font-brutalist font-bold transform -rotate-2">
                 {product.price}
               </div>
            </div>
          </div>
          
          {/* Footer Metadata */}
          <div className="p-2 pt-0 font-mono text-[10px] text-gray-400 flex justify-between">
            <span>ID: {product.id.toString().padStart(4, '0')}</span>
            <span>STOCK: LOW</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DraggableGallery;
