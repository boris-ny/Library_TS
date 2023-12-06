export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string,
  password2: string,
}

export interface Userlogin { 
  email: string;
  password: string;
}

export interface Book {
  Genre?: string | any;
  Author?: string | any;
  id?: number,
  title: string;
  authorId: number;
  summary: string;
  isbn: string;
  genreId: number;

}


export interface ServiceError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
