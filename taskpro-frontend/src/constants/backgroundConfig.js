// ─────────────────────────────────────────────────────────────────────────────
// Centralized background configuration
// One source of truth for preview thumbnails + all three size variants.
//
// Mapping logic (same photo, different crops):
//   mobile file N  →  tablet file (N − 15)  →  pc file (sequential position)
//   e.g. mobile 37.png → tablet 22.png → pc 8.png
// ─────────────────────────────────────────────────────────────────────────────

// ── Preview thumbnails (shown in create/edit modal) ──────────────────────────
import thumb0  from '../assets/mobil-back-icon-photos-createBoard/block.png';
import thumb1  from '../assets/mobil-back-icon-photos-createBoard/Vector.png';
import thumb2  from '../assets/mobil-back-icon-photos-createBoard/Vector-1.png';
import thumb3  from '../assets/mobil-back-icon-photos-createBoard/Vector-2.png';
import thumb4  from '../assets/mobil-back-icon-photos-createBoard/Vector-3.png';
import thumb5  from '../assets/mobil-back-icon-photos-createBoard/Vector-4.png';
import thumb6  from '../assets/mobil-back-icon-photos-createBoard/Vector-5.png';
import thumb7  from '../assets/mobil-back-icon-photos-createBoard/Vector-6.png';
import thumb8  from '../assets/mobil-back-icon-photos-createBoard/Vector-7.png';
import thumb9  from '../assets/mobil-back-icon-photos-createBoard/Vector-8.png';
import thumb10 from '../assets/mobil-back-icon-photos-createBoard/Vector-9.png';
import thumb11 from '../assets/mobil-back-icon-photos-createBoard/Vector-10.png';
import thumb12 from '../assets/mobil-back-icon-photos-createBoard/Vector-11.png';
import thumb13 from '../assets/mobil-back-icon-photos-createBoard/Vector-12.png';
import thumb14 from '../assets/mobil-back-icon-photos-createBoard/Vector-13.png';
import thumb15 from '../assets/mobil-back-icon-photos-createBoard/Vector-14.png';

// ── Mobile backgrounds (mobil-back, files 26–40) ─────────────────────────────
import mobile1  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 37.png';
import mobile2  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 27.png';
import mobile3  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 36.png';
import mobile4  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 39.png';
import mobile5  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 40.png';
import mobile6  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 38.png';
import mobile7  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 34.png';
import mobile8  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 35.png';
import mobile9  from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 33.png';
import mobile10 from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 32.png';
import mobile11 from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 31.png';
import mobile12 from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 29.png';
import mobile13 from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 30.png';
import mobile14 from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 28.png';
import mobile15 from '../assets/mobil-back/diego-ph-wyeapf7Gy-U-unsplash 26.png';

// ── Tablet backgrounds (tablet-back, files 11–25; mobile N → tablet N−15) ───
import tablet1  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 22.png'; // 37−15=22
import tablet2  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 12.png'; // 27−15=12
import tablet3  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 21.png'; // 36−15=21
import tablet4  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 24.png'; // 39−15=24
import tablet5  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 23.png'; // 40−15=25
import tablet6  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 25.png'; // 38−15=23
import tablet7  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 19.png'; // 34−15=19
import tablet8  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 20.png'; // 35−15=20
import tablet9  from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 18.png'; // 33−15=18
import tablet10 from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 17.png'; // 32−15=17
import tablet11 from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 16.png'; // 31−15=16
import tablet12 from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 14.png'; // 29−15=14
import tablet13 from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 15.png'; // 30−15=15
import tablet14 from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 11.png'; // 28−15=13
import tablet15 from '../assets/tablet-back/diego-ph-wyeapf7Gy-U-unsplash 13.png'; // 26−15=11

// ── Desktop / PC backgrounds (pc-back; sequential position of same photo) ────
// Photo content order by number: 26,27,28,29,30,31,32,33,34,35,36,37,38,39,40
// PC file order:                  1, 1-1,1-2,1-3,1-4,2, 3, 4, 5, 6, 7, 8, 9,10,11
import desktop1  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 1-3.png';   // mobile 37 = pos 12
import desktop2  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 4.png'; // mobile 27 = pos 2
import desktop3  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 1-1.png';   // mobile 36 = pos 11
import desktop4  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 6.png';  // mobile 39 = pos 14
import desktop5  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 5.png';  // mobile 40 = pos 15
import desktop6  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 7.png';   // mobile 38 = pos 13
import desktop7  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 1-2.png';   // mobile 34 = pos 9
import desktop8  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 8.png';   // mobile 35 = pos 10
import desktop9  from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 1.png';   // mobile 33 = pos 8
import desktop10 from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 9.png';   // mobile 32 = pos 7
import desktop11 from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 1-4.png';   // mobile 31 = pos 6
import desktop12 from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 10.png'; // mobile 29 = pos 4
import desktop13 from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 2.png'; // mobile 30 = pos 5
import desktop14 from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 11.png'; // mobile 28 = pos 3
import desktop15 from '../assets/pc-back/diego-ph-wyeapf7Gy-U-unsplash 3.png';   // mobile 26 = pos 1

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUNDS — single source of truth
// id: stable string key stored on the board object
// preview: small thumbnail shown in create/edit modal
// mobile:  full-size background for 0–767 px
// tablet:  full-size background for 768–1439 px
// desktop: full-size background for 1440 px+
// ─────────────────────────────────────────────────────────────────────────────
export const BACKGROUNDS = [
  { id: 'bg-0',  preview: thumb0,  mobile: null,     tablet: null,     desktop: null     },
  { id: 'bg-1',  preview: thumb1,  mobile: mobile1,  tablet: tablet1,  desktop: desktop1  },
  { id: 'bg-2',  preview: thumb2,  mobile: mobile2,  tablet: tablet2,  desktop: desktop2  },
  { id: 'bg-3',  preview: thumb3,  mobile: mobile3,  tablet: tablet3,  desktop: desktop3  },
  { id: 'bg-4',  preview: thumb4,  mobile: mobile4,  tablet: tablet4,  desktop: desktop4  },
  { id: 'bg-5',  preview: thumb5,  mobile: mobile5,  tablet: tablet5,  desktop: desktop5  },
  { id: 'bg-6',  preview: thumb6,  mobile: mobile6,  tablet: tablet6,  desktop: desktop6  },
  { id: 'bg-7',  preview: thumb7,  mobile: mobile7,  tablet: tablet7,  desktop: desktop7  },
  { id: 'bg-8',  preview: thumb8,  mobile: mobile8,  tablet: tablet8,  desktop: desktop8  },
  { id: 'bg-9',  preview: thumb9,  mobile: mobile9,  tablet: tablet9,  desktop: desktop9  },
  { id: 'bg-10', preview: thumb10, mobile: mobile10, tablet: tablet10, desktop: desktop10 },
  { id: 'bg-11', preview: thumb11, mobile: mobile11, tablet: tablet11, desktop: desktop11 },
  { id: 'bg-12', preview: thumb12, mobile: mobile12, tablet: tablet12, desktop: desktop12 },
  { id: 'bg-13', preview: thumb13, mobile: mobile13, tablet: tablet13, desktop: desktop13 },
  { id: 'bg-14', preview: thumb14, mobile: mobile14, tablet: tablet14, desktop: desktop14 },
  { id: 'bg-15', preview: thumb15, mobile: mobile15, tablet: tablet15, desktop: desktop15 },
];

/** Finds a background entry by its stable id. Returns null-safe entry. */
export const findBgById = id => BACKGROUNDS.find(b => b.id === id) ?? BACKGROUNDS[0];
