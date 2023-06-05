
import axiosInstance from '@/libs/axios';
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'react-toastify';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, showLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoading(true);
    axiosInstance.post('/users/dangnhap', { email, password }).then(res => {
      localStorage.setItem('token', res.data.token);
      toast.success('Đăng nhập thành công');
      showLoading(false);
      router.push('/list');
    }
    ).catch(err => {
      toast.error(err.response.data.error || 'Đăng nhập thất bại ');
      showLoading(false);
    }
    )
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-2">
        <input required onChange={(e) => setEmail(e.target.value)} className="border border-gray-400 rounded-md p-2 w-80" type="email" placeholder="Email" />
        <input required onChange={(e) => setPassword(e.target.value)} className="border border-gray-400 rounded-md p-2 w-80" type="password" placeholder="Mật khẩu" />
        <button className="btn btn-accent w-80 font-bold" disabled={loading} type="submit">{loading ? 'loading' : 'Đăng nhập'}</button>
      </form>
    </div>
  )
}
