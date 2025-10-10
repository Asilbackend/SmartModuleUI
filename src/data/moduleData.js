export const modules = [
  {
    id: 1,
    name: '1-modul',
    sections: [
      {
        id: 1,
        title: 'Universitet tarixi va tashkiliy tuzilmasi',
        type: 'majburiy',
        items: [
          { id: 1, type: 'video', text: 'Universitetning ilk faoliyati', duration: '4-min' },
          { id: 2, type: 'video', text: 'Fakultetlar va kafedralar', duration: '5-min' },
          { id: 3, type: 'video', text: 'Ilk bitiruvchilar haqida', duration: '3-min' },
          { id: 4, type: 'video', text: 'Universitet rivojlanish bosqichlari', duration: '6-min' },
          { id: 5, type: 'text', text: 'Universitet 1950-yilda tashkil topgan.' },
          { id: 6, type: 'text', text: 'Bugungi kunda 10 mingdan ortiq talaba tahsil oladi.' },
          {
            id: 7,
            type: 'text',
            text: 'Ilmiy izlanishlar universitet hayotida muhim o‘rin tutadi.',
          },
        ],
      },
      {
        id: 2,
        title: 'Universitet ichki tartib qoidalari',
        type: 'ixtiyoriy',
        items: [
          {
            id: 1,
            type: 'video',
            text: 'Ichki tartiblar haqida umumiy tushuncha',
            duration: '4-min',
          },
          { id: 2, type: 'video', text: 'Talabalarning majburiyatlari', duration: '5-min' },
          { id: 3, type: 'text', text: 'Talabalar darslarga o‘z vaqtida qatnashishi shart.' },
          { id: 4, type: 'text', text: 'Universitet hududida intizom saqlanishi zarur.' },
          {
            id: 5,
            type: 'text',
            text: 'O‘qituvchilar va talabalar o‘zaro hurmatda bo‘lishi kerak.',
          },
          {
            id: 6,
            type: 'text',
            text: 'Ichki tartib buzilgan hollarda tegishli choralar ko‘riladi.',
          },
        ],
      },
      {
        id: 3,
        title: 'Talabalarga yaratilgan sharoitlar',
        type: 'majburiy',
        items: [
          { id: 1, type: 'video', text: 'Yotoqxona sharoitlari', duration: '4-min' },
          { id: 2, type: 'video', text: 'Kutubxona imkoniyatlari', duration: '5-min' },
          { id: 3, type: 'video', text: 'Sport inshootlari', duration: '3-min' },
          { id: 4, type: 'text', text: 'Talabalar bepul internetdan foydalanishlari mumkin.' },
          { id: 5, type: 'text', text: 'Kutubxona 100 mingdan ortiq kitoblarga ega.' },
          { id: 6, type: 'text', text: 'Sport zallari 24/7 faoliyat ko‘rsatadi.' },
        ],
      },
      {
        id: 4,
        title: 'Talabalar hayoti va tadbirlar',
        type: 'ixtiyoriy',
        items: [
          { id: 1, type: 'video', text: 'Talabalar festivali', duration: '4-min' },
          { id: 2, type: 'video', text: 'Ilmiy konferensiyalar', duration: '6-min' },
          { id: 3, type: 'video', text: 'Sport musobaqalari', duration: '5-min' },
          { id: 4, type: 'text', text: 'Talabalar klublari faoliyat olib boradi.' },
          { id: 5, type: 'text', text: 'Har oyda madaniy tadbirlar o‘tkaziladi.' },
          { id: 6, type: 'text', text: 'Talabalar ijtimoiy loyihalarda qatnashadi.' },
          { id: 7, type: 'text', text: 'Universitet yoshlar ittifoqi faoliyat yuritadi.' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '2-modul',
    sections: [
      {
        id: 1,
        title: 'Ilmiy tadqiqotlar asoslari',
        type: 'majburiy',
        items: [
          { id: 1, type: 'video', text: 'Tadqiqot metodlari', duration: '5-min' },
          { id: 2, type: 'video', text: 'Ma’lumotlar tahlili', duration: '5-min' },
          { id: 3, type: 'video', text: 'Tadqiqot natijalari', duration: '4-min' },
          {
            id: 4,
            type: 'text',
            text: 'Tadqiqot metodlari ilmiy ishlarni samarali olib borishda muhim rol o‘ynaydi.',
          },
          {
            id: 5,
            type: 'text',
            text: 'Natijalarni to‘g‘ri tahlil qilish ilmiy ishning asosiy qismi hisoblanadi.',
          },
        ],
      },
      {
        id: 2,
        title: 'Ilmiy maqola yozish',
        type: 'ixtiyoriy',
        items: [
          { id: 1, type: 'video', text: 'Ilmiy maqola tuzilishi', duration: '4-min' },
          { id: 2, type: 'video', text: 'Manbalarni to‘g‘ri ko‘rsatish', duration: '3-min' },
          { id: 3, type: 'video', text: 'Maqolani jurnalga yuborish tartibi', duration: '5-min' },
          { id: 4, type: 'text', text: 'Maqola aniq va tushunarli tuzilgan bo‘lishi kerak.' },
          { id: 5, type: 'text', text: 'Manbalarni to‘g‘ri ko‘rsatish plagiatning oldini oladi.' },
        ],
      },
    ],
  },
  {
    id: 3,
    name: '3-modul',
    sections: [
      {
        id: 1,
        title: 'Innovatsion texnologiyalar',
        type: 'majburiy',
        items: [
          { id: 1, type: 'video', text: 'Raqamli texnologiyalar', duration: '4-min' },
          { id: 2, type: 'video', text: 'Sun’iy intellekt asoslari', duration: '6-min' },
          { id: 3, type: 'video', text: 'Blokcheyn texnologiyasi', duration: '5-min' },
          {
            id: 4,
            type: 'text',
            text: 'Raqamli texnologiyalar zamonaviy iqtisodiyotning ajralmas qismi hisoblanadi.',
          },
          {
            id: 5,
            type: 'text',
            text: 'Sun’iy intellekt ko‘plab sohalarda inson ishini yengillashtiradi.',
          },
        ],
      },
      {
        id: 2,
        title: 'Startap va innovatsiyalar',
        type: 'ixtiyoriy',
        items: [
          { id: 1, type: 'video', text: 'Startap nima?', duration: '5-min' },
          { id: 2, type: 'video', text: 'Startapni moliyalashtirish', duration: '4-min' },
          {
            id: 3,
            type: 'video',
            text: 'Innovatsion g‘oyalarni amalga oshirish',
            duration: '4-min',
          },
          {
            id: 4,
            type: 'text',
            text: 'Startap — yangi biznes g‘oyani bozorda amalga oshirishga qaratilgan loyiha.',
          },
          {
            id: 5,
            type: 'text',
            text: 'Investitsiyalar startap rivojlanishida asosiy omil hisoblanadi.',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: '4-modul',
    sections: [
      {
        id: 1,
        title: 'Kasbiy kompetensiyalar',
        type: 'majburiy',
        items: [
          { id: 1, type: 'video', text: 'Liderlik ko‘nikmalari', duration: '6-min' },
          { id: 2, type: 'video', text: 'Jamoada ishlash', duration: '5-min' },
          { id: 3, type: 'video', text: 'Muammolarni hal qilish', duration: '5-min' },
          {
            id: 4,
            type: 'text',
            text: 'Liderlik — bu boshqalarni maqsad sari yetaklash san’atidir.',
          },
          {
            id: 5,
            type: 'text',
            text: 'Jamoada ishlash har bir a’zodan mas’uliyat va hamkorlikni talab qiladi.',
          },
        ],
      },
      {
        id: 2,
        title: 'Kasbiy etika va madaniyat',
        type: 'ixtiyoriy',
        items: [
          { id: 1, type: 'video', text: 'Kasbiy etika asoslari', duration: '4-min' },
          { id: 2, type: 'video', text: 'Xizmat ko‘rsatish madaniyati', duration: '4-min' },
          { id: 3, type: 'video', text: 'Kasbiy etikada xatolar', duration: '3-min' },
          {
            id: 4,
            type: 'text',
            text: 'Kasbiy etika mehnat faoliyatida halollik va mas’uliyatni anglatadi.',
          },
          { id: 5, type: 'text', text: 'Yuqori xizmat madaniyati mijozlar ishonchini oshiradi.' },
        ],
      },
    ],
  },
];
