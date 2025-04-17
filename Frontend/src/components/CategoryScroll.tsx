import React, { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
interface Category {
  id: string;
  name: string;
  icon: string;
}
const categories: Category[] = [{
  id: '1',
  name: 'Grocery',
  icon: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '2',
  name: 'Pizza',
  icon: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '3',
  name: 'Desserts',
  icon: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '4',
  name: 'Bakery',
  icon: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '5',
  name: 'Burgers',
  icon: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '6',
  name: 'Bubble Tea',
  icon: 'https://images.unsplash.com/photo-1558857563-b0b6b2913945?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '7',
  name: 'Chinese',
  icon: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '8',
  name: 'Healthy',
  icon: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '9',
  name: 'Indian',
  icon: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '10',
  name: 'Soup',
  icon: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=100&h=100&q=80'
}, {
  id: '11',
  name: 'Korean',
  icon: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=100&h=100&q=80'
}];
interface CategoryScrollProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}
const CategoryScroll: React.FC<CategoryScrollProps> = ({
  onSelectCategory,
  selectedCategory
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };
  return <div className="relative bg-white py-6">
      <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
        <ChevronLeftIcon size={20} className="text-black" />
      </button>
      <div className="overflow-x-auto scrollbar-hide mx-10" ref={scrollRef}>
        <div className="flex space-x-8 px-4 min-w-max">
          {categories.map(category => <div key={category.id} className="flex flex-col items-center cursor-pointer group" onClick={() => onSelectCategory(category.name)}>
              <div className={`
                w-16 h-16 rounded-full overflow-hidden mb-2 
                transform transition-transform duration-200 
                group-hover:scale-110 relative
                ${selectedCategory === category.name ? 'ring-2 ring-black' : ''}
              `}>
                <img src={category.icon} alt={category.name} className="w-full h-full object-cover" />
              </div>
              <span className={`
                text-sm whitespace-nowrap
                ${selectedCategory === category.name ? 'text-black font-medium' : 'text-gray-600'}
              `}>
                {category.name}
              </span>
            </div>)}
        </div>
      </div>
      <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
        <ChevronRightIcon size={20} className="text-black" />
      </button>
    </div>;
};
export default CategoryScroll;