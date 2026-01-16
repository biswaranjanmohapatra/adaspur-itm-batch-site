export interface Student {
  id: number;
  name: string;
  rollNo: string;
  isCreator?: boolean;
  isCR?: boolean;
  isBeautiful?: boolean;
  photo?: string;
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

export const students: Student[] = [
  { id: 1, name: "Amaresh Sundaray", rollNo: "UNITM21001" },
  { id: 2, name: "Aryabrata Panda", rollNo: "UNITM21002", photo: aryaPhoto },
  { id: 3, name: "Ashutosh Swain", rollNo: "UNITM21003" },
  { id: 4, name: "Ayasakanta Behera", rollNo: "UNITM21004" },
  { id: 5, name: "Bhabani Sankar Mohapatra", rollNo: "UNITM21005" },
  { id: 6, name: "Bijayalaxmi Behera", rollNo: "UNITM21006" },
  { id: 7, name: "Biranchi Prasad Singh", rollNo: "UNITM21007", photo: biranchiPhoto },
  { id: 8, name: "Bishnupriya Barik", rollNo: "UNITM21008" },
  { id: 9, name: "Biswa Ranjan Mohapatra", rollNo: "UNITM21009", isCreator: true },
  { id: 10, name: "Deba Pradhan", rollNo: "UNITM21010", photo: debaPhoto },
  { id: 11, name: "Debaswini Swain", rollNo: "UNITM21011", isBeautiful: true, photo: debaswiniPhoto },
  { id: 12, name: "Dibyajyoti Patra", rollNo: "UNITM21012", isCR: true, photo: dibyaPhoto },
  { id: 13, name: "Himansu Sekhar Behera", rollNo: "UNITM21013" },
  { id: 14, name: "Khusbu Nayak", rollNo: "UNITM21014" },
  { id: 15, name: "Mayuresh Mohapatra", rollNo: "UNITM21015" },
  { id: 16, name: "Monalisa Mangaraj", rollNo: "UNITM21016" },
  { id: 17, name: "Muskan Padhan", rollNo: "UNITM21017", isBeautiful: true, photo: muskanPhoto },
  { id: 18, name: "Narmada Biswal", rollNo: "UNITM21018" },
  { id: 19, name: "Niladri Narayan Dash", rollNo: "UNITM21019" },
  { id: 20, name: "Om Prakash Sahoo", rollNo: "UNITM21020", photo: ommPhoto },
  { id: 21, name: "Payal Priyadarsini Paital", rollNo: "UNITM21021", photo: payalPhoto },
  { id: 22, name: "Preeti Jena", rollNo: "UNITM21022" },
  { id: 23, name: "Prince Patra", rollNo: "UNITM21023", photo: princePhoto },
  { id: 24, name: "Pritesh Kumar Dash", rollNo: "UNITM21024", photo: priteshPhoto },
  { id: 25, name: "Siba Prasad Biswal", rollNo: "UNITM21025" },
  { id: 26, name: "Somanatha Sahoo", rollNo: "UNITM21026", photo: somanathaPhoto },
  { id: 27, name: "Soumya Ranjan Das", rollNo: "UNITM21027", photo: soumyaPhoto },
  { id: 28, name: "Subhasis Sahoo", rollNo: "UNITM21028", photo: subhasisPhoto },
  { id: 29, name: "Sunil Kumar Biswal", rollNo: "UNITM21029", photo: sunilPhoto },
  { id: 30, name: "Suvam Das", rollNo: "UNITM21030", photo: suvamPhoto },
];

export interface Teacher {
  id: number;
  name: string;
  designation: string;
  department: string;
}

export const teachers: Teacher[] = [
  { 
    id: 1, 
    name: "Dr. Sangam Malla", 
    designation: "Faculty",
    department: "B.Sc ITM"
  },
  { 
    id: 2, 
    name: "Monalisha Behera", 
    designation: "Faculty",
    department: "B.Sc ITM"
  },
  { 
    id: 3, 
    name: "Milan Samantaray", 
    designation: "Faculty",
    department: "B.Sc ITM"
  },
];
