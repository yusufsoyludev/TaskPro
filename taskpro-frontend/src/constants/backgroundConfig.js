
import thumb1  from '../assets/block.webp';
import thumb2  from '../assets/Vector.webp';
import thumb3  from '../assets/Vector-1.webp';
import thumb4  from '../assets/Vector-2.webp';
import thumb5  from '../assets/Vector-3.webp';
import thumb6  from '../assets/Vector-4.webp';
import thumb7  from '../assets/Vector-5.webp';
import thumb8  from '../assets/Vector-6.webp';
import thumb9 from '../assets/Vector-7.webp';
import thumb10  from '../assets/Vector-8.webp';
import thumb11 from '../assets/Vector-9.webp';
import thumb12 from '../assets/Vector-10.webp';
import thumb13 from '../assets/Vector-11.webp';
import thumb14 from '../assets/Vector-12.webp';
import thumb15 from '../assets/Vector-13.webp';



import mobile1  from '../assets/mobil-1.webp';
import mobile2  from '../assets/mobil-2.webp';
import mobile3  from '../assets/mobil-3.webp';
import mobile4  from '../assets/mobil-4.webp';
import mobile5  from '../assets/mobil-5.webp';
import mobile6  from '../assets/mobil-6.webp';
import mobile7  from '../assets/mobil-7.webp';
import mobile8  from '../assets/mobil-8.webp';
import mobile9  from '../assets/mobil-9.webp';
import mobile10 from '../assets/mobil-10.webp';
import mobile11 from '../assets/mobil-11.webp';
import mobile12 from '../assets/mobil-12.webp';
import mobile13 from '../assets/mobil-13.webp';
import mobile14 from '../assets/mobil-14.webp';
import mobile15 from '../assets/mobil-15.webp';


import tablet1  from '../assets/tablet-1.webp'; 
import tablet2  from '../assets/tablet-2.webp'; 
import tablet3  from '../assets/tablet-3.webp'; 
import tablet4  from '../assets/tablet-4.webp'; 
import tablet5  from '../assets/tablet-5.webp'; 
import tablet6  from '../assets/tablet-6.webp'; 
import tablet7  from '../assets/tablet-7.webp'; 
import tablet8  from '../assets/tablet-8.webp'; 
import tablet9  from '../assets/tablet-9.webp'; 
import tablet10 from '../assets/tablet-10.webp'; 
import tablet11 from '../assets/tablet-11.webp'; 
import tablet12 from '../assets/tablet-12.webp'; 
import tablet13 from '../assets/tablet-13.webp'; 
import tablet14 from '../assets/tablet-14.webp';
import tablet15 from '../assets/tablet-15.webp'; 


import desktop1  from '../assets/pc-1.webp';   
import desktop2  from '../assets/pc-2.webp';   
import desktop3  from '../assets/pc-3.webp';   
import desktop4  from '../assets/pc-4.webp';   
import desktop5  from '../assets/pc-5.webp';   
import desktop6  from '../assets/pc-6.webp';   
import desktop7  from '../assets/pc-7.webp';   
import desktop8  from '../assets/pc-8.webp';   
import desktop9  from '../assets/pc-9.webp';   
import desktop10 from '../assets/pc-10.webp';  
import desktop11 from '../assets/pc-11.webp';  
import desktop12 from '../assets/pc-12.webp';  
import desktop13 from '../assets/pc-13.webp';  
import desktop14 from '../assets/pc-14.webp';  
import desktop15 from '../assets/pc-15.webp';


export const BACKGROUNDS = [
  { id: 'bg-0',  preview: thumb1,  mobile: null,     tablet: null,     desktop: null     },
  { id: 'bg-1',  preview: thumb2,  mobile: mobile1,  tablet: tablet1,  desktop: desktop1  },
  { id: 'bg-2',  preview: thumb3,  mobile: mobile2,  tablet: tablet2,  desktop: desktop2  },
  { id: 'bg-3',  preview: thumb4,  mobile: mobile3,  tablet: tablet3,  desktop: desktop3  },
  { id: 'bg-4',  preview: thumb5,  mobile: mobile4,  tablet: tablet4,  desktop: desktop4  },
  { id: 'bg-5',  preview: thumb6,  mobile: mobile5,  tablet: tablet5,  desktop: desktop5  },
  { id: 'bg-6',  preview: thumb7,  mobile: mobile6,  tablet: tablet6,  desktop: desktop6  },
  { id: 'bg-7',  preview: thumb8,  mobile: mobile7,  tablet: tablet7,  desktop: desktop7  },
  { id: 'bg-8',  preview: thumb9,  mobile: mobile8,  tablet: tablet8,  desktop: desktop8  },
  { id: 'bg-9',  preview: thumb10,  mobile: mobile9,  tablet: tablet9,  desktop: desktop9  },
  { id: 'bg-10', preview: thumb11, mobile: mobile10, tablet: tablet10, desktop: desktop10 },
  { id: 'bg-11', preview: thumb12, mobile: mobile11, tablet: tablet11, desktop: desktop11 },
  { id: 'bg-12', preview: thumb13, mobile: mobile12, tablet: tablet12, desktop: desktop12 },
  { id: 'bg-13', preview: thumb14, mobile: mobile13, tablet: tablet13, desktop: desktop13 },
  { id: 'bg-14', preview: thumb15, mobile: mobile14, tablet: tablet14, desktop: desktop14 },
  
];


export const findBgById = id => BACKGROUNDS.find(b => b.id === id) ?? BACKGROUNDS[0];
