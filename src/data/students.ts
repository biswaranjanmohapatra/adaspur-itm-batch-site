export interface Student {
  id: number;
  name: string;
  rollNo: string;
  isCreator?: boolean;
}

export const students: Student[] = [
  { id: 1, name: "Amaresh Sundaray", rollNo: "UNITM21001" },
  { id: 2, name: "Aryabrata Panda", rollNo: "UNITM21002" },
  { id: 3, name: "Ashutosh Swain", rollNo: "UNITM21003" },
  { id: 4, name: "Ayasakanta Behera", rollNo: "UNITM21004" },
  { id: 5, name: "Bhabani Sankar Mohapatra", rollNo: "UNITM21005" },
  { id: 6, name: "Bijayalaxmi Behera", rollNo: "UNITM21006" },
  { id: 7, name: "Biranchi Prasad Singh", rollNo: "UNITM21007" },
  { id: 8, name: "Bishnupriya Barik", rollNo: "UNITM21008" },
  { id: 9, name: "Biswa Ranjan Mohapatra", rollNo: "UNITM21009", isCreator: true },
  { id: 10, name: "Deba Pradhan", rollNo: "UNITM21010" },
  { id: 11, name: "Debaswini Swain", rollNo: "UNITM21011" },
  { id: 12, name: "Dibyajyoti Patra", rollNo: "UNITM21012" },
  { id: 13, name: "Himansu Sekhar Behera", rollNo: "UNITM21013" },
  { id: 14, name: "Khusbu Nayak", rollNo: "UNITM21014" },
  { id: 15, name: "Mayuresh Mohapatra", rollNo: "UNITM21015" },
  { id: 16, name: "Monalisa Mangaraj", rollNo: "UNITM21016" },
  { id: 17, name: "Muskan Padhan", rollNo: "UNITM21017" },
  { id: 18, name: "Narmada Biswal", rollNo: "UNITM21018" },
  { id: 19, name: "Niladri Narayan Dash", rollNo: "UNITM21019" },
  { id: 20, name: "Om Prakash Sahoo", rollNo: "UNITM21020" },
  { id: 21, name: "Payal Priyadarsini Paital", rollNo: "UNITM21021" },
  { id: 22, name: "Preeti Jena", rollNo: "UNITM21022" },
  { id: 23, name: "Prince Patra", rollNo: "UNITM21023" },
  { id: 24, name: "Pritesh Kumar Dash", rollNo: "UNITM21024" },
  { id: 25, name: "Siba Prasad Biswal", rollNo: "UNITM21025" },
  { id: 26, name: "Somanatha Sahoo", rollNo: "UNITM21026" },
  { id: 27, name: "Soumya Ranjan Das", rollNo: "UNITM21027" },
  { id: 28, name: "Subhasis Sahoo", rollNo: "UNITM21028" },
  { id: 29, name: "Sunil Kumar Biswal", rollNo: "UNITM21029" },
  { id: 30, name: "Suvam Das", rollNo: "UNITM21030" },
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
