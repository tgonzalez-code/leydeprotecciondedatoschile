
import React from 'react';

const LabSection: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-40">
      <div className="relative w-full h-[600px] rounded-2xl overflow-hidden group cursor-crosshair shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCs2dKc8gZ_0wM1Lpam6yodTImh_CKJcihPK9GEUzObJ77S-sURLsNAL-wL6i2V8VTzO4vC9_ChjZdHB8ioeijDEAmvo3qN23gdi38GDQ5dl31WNhruUZRSzk7yuBBEOkuzcappV11kKHEPcFoQaBWCiO0zu-gEK0hUTlisUCaifGim8xMW_4KB9Ys52KOlCIV6GR6V8GNklr6zagVMe6KUKUs3BdmjShRvhc0pYLeVyR9ykzNLsYNDMuOBVJkTKZPeBTC37yHS9c4')` 
          }}
        ></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl">
              <h3 className="text-4xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tighter">
                LABORATORIO DE INNOVACIÓN
              </h3>
              <p className="text-xl lg:text-2xl text-zinc-300 font-medium leading-relaxed">
                Donde la inteligencia artificial se encuentra con la creatividad líquida para dar vida a lo imposible.
              </p>
            </div>
            <button className="whitespace-nowrap bg-white text-black rounded-full px-12 py-6 font-bold text-xl hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">
              Explorar Lab
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabSection;
