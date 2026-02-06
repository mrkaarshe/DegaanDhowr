import type { LucideIcon } from 'lucide-react'

export type HomeFeature = {
  icon: LucideIcon
  title: string
  description: string
}

export type HomeVideoTestimonial = {
  id: number
  title: string
  author: string
  rating: number
  videoUrl: string
  thumbnail: string
}

export const HOME_SLIDES: string[] = [
  'https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/488051972_970982855233931_5361198965868680905_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=VV7hX_BmSJsQ7kNvwFqnLop&_nc_oc=Admr8dAc1OQWVzxM0AxZXbC_JkQ1QmznSMcHQV7Rd7Z8B9dKvTA1FbHfXgAx3CeFg6U&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=Eqw30JWdthRS1b_sC_8EnQ&oh=00_AftDgGHPokD18dPINsYULOIdfqwuWYTdxtLKbBA9uOc_-g&oe=6988E32A',
  'https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/453046411_793396172992601_7775078400042446627_n.png?stp=dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=OWje2chtrTAQ7kNvwFO0eu4&_nc_oc=AdmtM2t62AOuejpCKr6-U265RkZJAVBf6wtOqemlu2MFglpXZjbDVaXJmqu6iAHA2KQ&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=KhneMhHlKhMeV9htBAzgHw&oh=00_AfsSoCKKmmv9a5QPvbiVJoZFSN8c36uWLVlDElsAYk79Kw&oe=69891186',
  'https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/473369274_1785974278888695_7388817838228049477_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=chlaJLo9OYEQ7kNvwHxsLV4&_nc_oc=AdncHynUSF1aGQdMCBtbSyvSwFcnIC_TnzdSuJLD-mdhGcEN-kDlUx2FepAnX1MCTKs&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=SloPSvC3l7OvDnAagjLezw&oh=00_Afv3Dj5weNUZgIAmEKaOCwiato6t-_PtTdcEZ35YaLlfjg&oe=6988B9A7',
  'https://scontent.fmgq3-1.fna.fbcdn.net/v/t39.30808-6/485760711_961188746213342_4616942072599496247_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=M1e8X1KUfXcQ7kNvwHghCnW&_nc_oc=AdlgAjEjm3bLnuYnSUTSHNuGLf1OF8H3mcXrlO9RzysSl7nxfJXuFyrduIF2vR8RAp0&_nc_zt=23&_nc_ht=scontent.fmgq3-1.fna&_nc_gid=3yVro8ojXp460oAIcuMhhQ&oh=00_Afuh_CTiNK3TksGUul4D8iHfOU24R7wnMoBcqxVjNlBZAg&oe=6988E233',
]

export const HOME_CLIENT_LOGOS: string[] = [
  'https://online.siu.edu.so/pluginfile.php/1/theme_academi/logo/1720685942/SIU-LOGO-800x800.png',
  'https://admin.dtmca.so/wp-content/uploads/2025/09/yardemil.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGuMcEjEXXVvvKlPKKXNL9kddQnSbVVMhu2A&s',
  'https://kulmie.com/media/cache/main_image_listing/custom/domain_1/image_files/2484_photo_5154.webp',
]

export const HOME_VIDEO_TESTIMONIALS: HomeVideoTestimonial[] = [
  {
    id: 1,
    title: 'Yerdameli Hospital Experience',
    author: 'Ibrahim Maxamed Hassan',
    rating: 5,
    videoUrl: 'https://youtu.be/YzD-sehSj8s',
    thumbnail: '/thumb1.jpg',
  },
  {
    id: 2,
    title: 'Xooga Hospital Feedback',
    author: 'Client Feedback',
    rating: 5,
    videoUrl: 'https://youtu.be/gnuvOif7UGc',
    thumbnail: '/thumb2.jpg',
  },
  {
    id: 3,
    title: 'SIU University Review',
    author: 'Nur Ali Abdullahi',
    rating: 4,
    videoUrl: 'https://youtu.be/Wct64lZ7WIE',
    thumbnail: '/thumb3.jpg',
  },
  {
    id: 4,
    title: 'Ladan Hospital Review',
    author: 'Dr. Abdullahi Ahmed',
    rating: 5,
    videoUrl: 'https://youtu.be/cu2n2WCOnBQ',
    thumbnail: '/thumb4.jpg',
  },
  {
    id: 5,
    title: 'Residential Service',
    author: 'Maryan Siciid Mohamed',
    rating: 3,
    videoUrl: 'https://youtu.be/0y7QBEZuepg',
    thumbnail: '/thumb5.jpg',
  },
  {
    id: 6,
    title: 'Al Arabia University',
    author: 'Mohamed Ibrahim Ali',
    rating: 5,
    videoUrl: 'https://youtu.be/ks_nl9IuOuY',
    thumbnail: '/thumb6.jpg',
  },
  {
    id: 7,
    title: 'Ummah Hospital View',
    author: 'Ahmed Mohamed Hassan',
    rating: 4,
    videoUrl: 'https://youtu.be/Ka3AZ-Ra9So',
    thumbnail: '/thumb7.jpg',
  },
]

