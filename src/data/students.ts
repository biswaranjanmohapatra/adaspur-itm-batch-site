export interface Student {
  id: number;
  name: string;
  rollNo: string;
  isCreator?: boolean;
  isCR?: boolean;
  isBeautiful?: boolean;
  isExCR?: boolean;
  isGR?: boolean;
  isTopper?: boolean;
  isCoder?: boolean;
  photo?: string;
  bio?: string;
}

export interface Batch {
  id: string;
  name: string;
  years: string;
  students: Student[];
  isActive?: boolean;
}

// Import student photos
import amareshPhoto from '@/assets/students/amaresh.jpg';
import debaPhoto from '@/assets/students/deba.jpg';
import aryaPhoto from '@/assets/students/arya.jpg';
import ommPhoto from '@/assets/students/omm.jpg';
import sunilPhoto from '@/assets/students/sunil.jpg';
import subhasisPhoto from '@/assets/students/subhasis.jpg';
import priteshPhoto from '@/assets/students/pritesh.jpg';
import somanathaPhoto from '@/assets/students/somanatha.jpg';
import muskanPhoto from '@/assets/students/muskan.jpg';
import dibyaPhoto from '@/assets/students/dibya.jpg';
import suvamPhoto from '@/assets/students/suvam.jpg';
import payalPhoto from '@/assets/students/payal.jpg';
import debaswiniPhoto from '@/assets/students/debaswini.jpg';
import soumyaPhoto from '@/assets/students/soumya.jpg';
import princePhoto from '@/assets/students/prince.jpg';
import biranchiPhoto from '@/assets/students/biranchi.jpg';
import biswaPhoto from '@/assets/students/biswa.jpg';
import bhabaniPhoto from '@/assets/students/bhabani.jpg';
import ayaskantaPhoto from '@/assets/students/ayaskanta.jpg';
import mayureshPhoto from '@/assets/students/mayuresh.jpg';
import bishnupriyaPhoto from '@/assets/students/bishnupriya.jpg';
import narmadaPhoto from '@/assets/students/narmada.jpg';
import sibaPhoto from '@/assets/students/siba.jpg';
import himansuPhoto from '@/assets/students/himansu.jpg';
import monalisaPhoto from '@/assets/students/monalisa.jpg';
import preetiPhoto from '@/assets/students/preeti.jpg';
import bijayalaxmiPhoto from '@/assets/students/bijayalaxmi.jpg';
import ashutoshPhoto from '@/assets/students/ashutosh.jpg';
import niladriPhoto from '@/assets/students/niladri.jpg';
import khusbuPhoto from '@/assets/students/khusbu.jpg';

// 2021-2024 Batch Students
const batch2021_2024: Student[] = [
  // CR First - Featured in single row
  { id: 12, name: "Dibyajyoti Patra", rollNo: "UNITM21012", isCR: true, photo: dibyaPhoto, bio: "Born leader who united 30 hearts as one family" },
  
  // Other students
  { id: 1, name: "Amaresh Sundaray", rollNo: "UNITM21001", isTopper: true, photo: amareshPhoto, bio: "The brilliant mind who topped with flying colors" },
  { id: 2, name: "Aryabrata Panda", rollNo: "UNITM21002", photo: aryaPhoto, bio: "The stylish trendsetter with a charming personality" },
  { id: 3, name: "Ashutosh Swain", rollNo: "UNITM21003", photo: ashutoshPhoto, bio: "Cool guy with perfect style and sunglasses swag" },
  { id: 4, name: "Ayasakanta Behera", rollNo: "UNITM21004", photo: ayaskantaPhoto, bio: "Beach vibes and colorful personality" },
  { id: 5, name: "Bhabani Sankar Mohapatra", rollNo: "UNITM21005", photo: bhabaniPhoto, bio: "The charming one with big dreams" },
  { id: 6, name: "Bijayalaxmi Behera", rollNo: "UNITM21006", photo: bijayalaxmiPhoto, bio: "Elegant and graceful in every way" },
  { id: 7, name: "Biranchi Prasad Singh", rollNo: "UNITM21007", isTopper: true, photo: biranchiPhoto, bio: "Academic excellence meets humble nature" },
  { id: 8, name: "Bishnupriya Barik", rollNo: "UNITM21008", photo: bishnupriyaPhoto, bio: "Smart and confident with a great style" },
  { id: 9, name: "Biswa Ranjan Mohapatra", rollNo: "UNITM21009", isCreator: true, photo: biswaPhoto, bio: "Tech wizard inspired by Virat Kohli & Cristiano Ronaldo" },
  { id: 10, name: "Deba Pradhan", rollNo: "UNITM21010", photo: debaPhoto, bio: "Creative mind with endless energy" },
  { id: 11, name: "Debaswini Swain", rollNo: "UNITM21011", isBeautiful: true, photo: debaswiniPhoto, bio: "Beauty with Brain - the perfect combination" },
  { id: 13, name: "Himansu Sekhar Behera", rollNo: "UNITM21013", photo: himansuPhoto, bio: "Cool vibes with sunglasses style" },
  { id: 14, name: "Khusbu Nayak", rollNo: "UNITM21014", photo: khusbuPhoto, bio: "Sweet smile standing at ITM department entrance" },
  { id: 15, name: "Mayuresh Mohapatra", rollNo: "UNITM21015", photo: mayureshPhoto, bio: "The calm and composed gentleman" },
  { id: 16, name: "Monalisa Mangaraj", rollNo: "UNITM21016", photo: monalisaPhoto, bio: "Charming smile with an artistic soul" },
  { id: 17, name: "Muskan Padhan", rollNo: "UNITM21017", isBeautiful: true, photo: muskanPhoto, bio: "Her smile lights up every moment" },
  { id: 18, name: "Narmada Biswal", rollNo: "UNITM21018", photo: narmadaPhoto, bio: "Traditional beauty with a warm heart" },
  { id: 19, name: "Niladri Narayan Dash", rollNo: "UNITM21019", photo: niladriPhoto, bio: "Style king with cool sunglasses and attitude" },
  { id: 20, name: "Om Prakash Sahoo", rollNo: "UNITM21020", photo: ommPhoto, bio: "The fun-loving entertainer" },
  { id: 21, name: "Payal Priyadarsini Paital", rollNo: "UNITM21021", isGR: true, photo: payalPhoto, bio: "Leading the girls with grace and care" },
  { id: 22, name: "Preeti Jena", rollNo: "UNITM21022", photo: preetiPhoto, bio: "Nature lover with a peaceful soul" },
  { id: 23, name: "Prince Patra", rollNo: "UNITM21023", photo: princePhoto, bio: "Living up to his royal name" },
  { id: 24, name: "Pritesh Kumar Dash", rollNo: "UNITM21024", isCoder: true, photo: priteshPhoto, bio: "The coding expert and reliable rock of the group" },
  { id: 25, name: "Siba Prasad Biswal", rollNo: "UNITM21025", photo: sibaPhoto, bio: "Fashion forward with vibrant style" },
  { id: 26, name: "Somanatha Sahoo", rollNo: "UNITM21026", photo: somanathaPhoto, bio: "The thoughtful philosopher" },
  { id: 27, name: "Soumya Ranjan Das", rollNo: "UNITM21027", photo: soumyaPhoto, bio: "Friendly soul with a big heart" },
  { id: 28, name: "Subhasis Sahoo", rollNo: "UNITM21028", isCoder: true, photo: subhasisPhoto, bio: "The coding genius and dependable teammate" },
  { id: 29, name: "Sunil Kumar Biswal", rollNo: "UNITM21029", photo: sunilPhoto, bio: "Always there when you need him" },
  { id: 30, name: "Suvam Das", rollNo: "UNITM21030", isExCR: true, photo: suvamPhoto, bio: "Former CR who led with dedication" },
];

// All batches
export const batches: Batch[] = [
  {
    id: "2021-2024",
    name: "Batch 2021-2024",
    years: "2021-2024",
    students: batch2021_2024,
    isActive: false,
  },
  {
    id: "2022-2025",
    name: "Batch 2022-2025",
    years: "2022-2025",
    students: [],
    isActive: false,
  },
  {
    id: "2023-2026",
    name: "Batch 2023-2026",
    years: "2023-2026",
    students: [],
    isActive: true,
  },
  {
    id: "2024-2027",
    name: "Batch 2024-2027",
    years: "2024-2027",
    students: [],
    isActive: true,
  },
  {
    id: "2025-2028",
    name: "Batch 2025-2028",
    years: "2025-2028",
    students: [],
    isActive: true,
  },
];

// Legacy export for backward compatibility
export const students: Student[] = batch2021_2024;

export interface Teacher {
  id: number;
  name: string;
  designation: string;
  department: string;
  isExTeacher?: boolean;
  photo?: string;
}

// Import teacher photos
import sangamPhoto from '@/assets/teachers/sangam.jpg';
import milanPhoto from '@/assets/teachers/milan.jpg';
import monalishaPhoto from '@/assets/teachers/monalisha.jpg';

export const teachers: Teacher[] = [
  { 
    id: 1, 
    name: "Dr. Sangam Malla", 
    designation: "Ex-HOD",
    department: "B.Sc ITM",
    isExTeacher: true,
    photo: sangamPhoto
  },
  { 
    id: 2, 
    name: "Monalisha Behera", 
    designation: "Faculty",
    department: "B.Sc ITM",
    isExTeacher: true,
    photo: monalishaPhoto
  },
  { 
    id: 3, 
    name: "Milan Samantaray", 
    designation: "Faculty",
    department: "B.Sc ITM",
    isExTeacher: true,
    photo: milanPhoto
  },
];
