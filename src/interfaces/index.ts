export interface GenericData<T> {
  data: T;
}

export interface UserStore {
  email: any;
  otpCode: any;
  otp?: string;
  isAuth: boolean;
  userData: null | UserData;
  accessToken: null | string;
  refreshToken: null | string;
}

export interface Bike {
  id?: string;
  model?: string;
  color?: string;
  location?: string;
  rating?: string;
  status?: boolean;
  type?: string;
}
export interface FormValues {
  email?: string;
  password?: string;
  rePassword?: string;
  error?: string;
  userName?: string;
  otp?: string;
}

export interface UserData {
  id: string;
}

export interface AuthSuccessResponse {
  accessToken: string;
  refreshToken: string;
}
