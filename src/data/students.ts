export interface Student {
  id: number;
  name: string;
  rollNo: string;
  isCreator?: boolean;
  isCR?: boolean;
  isBeautiful?: boolean;
  isExCR?: boolean;
  isGR?: boolean;
  photo?: string;
  bio?: string;
}

// Import student photos
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

// Import teacher photos
import sangamPhoto from '@/assets/teachers/sangam.jpg';
import milanPhoto from '@/assets/teachers/milan.jpg';

export const students: Student[] = [
  { id: 1, name: "Amaresh Sundaray", rollNo: "UNITM21001", bio: "A silent achiever with a heart of gold" },
  { id: 2, name: "Aryabrata Panda", rollNo: "UNITM21002", photo: aryaPhoto, bio: "The cool guy who lights up every room" },
  { id: 3, name: "Ashutosh Swain", rollNo: "UNITM21003", bio: "Dedicated and hardworking soul" },
  { id: 4, name: "Ayasakanta Behera", rollNo: "UNITM21004", photo: ayaskantaPhoto, bio: "Stylish and always on point" },
  { id: 5, name: "Bhabani Sankar Mohapatra", rollNo: "UNITM21005", photo: bhabaniPhoto, bio: "The charming one with big dreams" },
  { id: 6, name: "Bijayalaxmi Behera", rollNo: "UNITM21006", bio: "Sweet, kind, and always smiling" },
  { id: 7, name: "Biranchi Prasad Singh", rollNo: "UNITM21007", photo: biranchiPhoto, bio: "The dependable friend we all need" },
  { id: 8, name: "Bishnupriya Barik", rollNo: "UNITM21008", bio: "Graceful and intelligent" },
  { id: 9, name: "Biswa Ranjan Mohapatra", rollNo: "UNITM21009", isCreator: true, photo: biswaPhoto, bio: "The visionary who built this site" },
  { id: 10, name: "Deba Pradhan", rollNo: "UNITM21010", photo: debaPhoto, bio: "Creative mind with endless energy" },
  { id: 11, name: "Debaswini Swain", rollNo: "UNITM21011", isBeautiful: true, photo: debaswiniPhoto, bio: "The beauty with brains" },
  { id: 12, name: "Dibyajyoti Patra", rollNo: "UNITM21012", isCR: true, photo: dibyaPhoto, bio: "Our beloved Class Representative" },
  { id: 13, name: "Himansu Sekhar Behera", rollNo: "UNITM21013", bio: "Quiet strength and wisdom" },
  { id: 14, name: "Khusbu Nayak", rollNo: "UNITM21014", bio: "Spreading fragrance of friendship" },
  { id: 15, name: "Mayuresh Mohapatra", rollNo: "UNITM21015", photo: mayureshPhoto, bio: "The cool and calm personality" },
  { id: 16, name: "Monalisa Mangaraj", rollNo: "UNITM21016", bio: "An artist at heart" },
  { id: 17, name: "Muskan Padhan", rollNo: "UNITM21017", isBeautiful: true, photo: muskanPhoto, bio: "A smile that brightens everyone's day" },
  { id: 18, name: "Narmada Biswal", rollNo: "UNITM21018", bio: "Gentle soul with a caring heart" },
  { id: 19, name: "Niladri Narayan Dash", rollNo: "UNITM21019", bio: "Smart and full of ideas" },
  { id: 20, name: "Om Prakash Sahoo", rollNo: "UNITM21020", photo: ommPhoto, bio: "The fun-loving entertainer" },
  { id: 21, name: "Payal Priyadarsini Paital", rollNo: "UNITM21021", isGR: true, photo: payalPhoto, bio: "Our responsible Girls' Representative" },
  { id: 22, name: "Preeti Jena", rollNo: "UNITM21022", bio: "Sweet and sincere friend" },
  { id: 23, name: "Prince Patra", rollNo: "UNITM21023", photo: princePhoto, bio: "Living up to his royal name" },
  { id: 24, name: "Pritesh Kumar Dash", rollNo: "UNITM21024", photo: priteshPhoto, bio: "The reliable rock of the group" },
  { id: 25, name: "Siba Prasad Biswal", rollNo: "UNITM21025", bio: "Calm and composed always" },
  { id: 26, name: "Somanatha Sahoo", rollNo: "UNITM21026", photo: somanathaPhoto, bio: "The thoughtful philosopher" },
  { id: 27, name: "Soumya Ranjan Das", rollNo: "UNITM21027", photo: soumyaPhoto, bio: "Friendly soul with a big heart" },
  { id: 28, name: "Subhasis Sahoo", rollNo: "UNITM21028", photo: subhasisPhoto, bio: "The dependable teammate" },
  { id: 29, name: "Sunil Kumar Biswal", rollNo: "UNITM21029", photo: sunilPhoto, bio: "Always there when you need him" },
  { id: 30, name: "Suvam Das", rollNo: "UNITM21030", isExCR: true, photo: suvamPhoto, bio: "Former CR who led with dedication" },
];

export interface Teacher {
  id: number;
  name: string;
  designation: string;
  department: string;
  isExTeacher?: boolean;
  photo?: string;
}

export const teachers: Teacher[] = [
  { 
    id: 1, 
    name: "Dr. Sangam Malla", 
    designation: "Faculty",
    department: "B.Sc ITM",
    isExTeacher: true,
    photo: sangamPhoto
  },
  { 
    id: 2, 
    name: "Monalisha Behera", 
    designation: "Faculty",
    department: "B.Sc ITM",
    isExTeacher: true
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
