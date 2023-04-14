export interface IColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface IDesgin {
  id: string;
  title: string;
  makerId: string;
  html: string;
  style: string;
  descript?: string;
  updatedAt?: string;
  createdAt?: string;
}
export interface IDefaultComp {
  title: string;
  descript: string;
  html: string;
  style: string;
}