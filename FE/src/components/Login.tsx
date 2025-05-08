import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const LoginPage = () => {
  return (
    <div className="max-w-sm mx-auto space-y-4 mt-10">
      <h2 className="text-xl font-bold">Đăng nhập</h2>
      <Input placeholder="Email" />
      <Input type="password" placeholder="Mật khẩu" />
      <Button className="w-full">Đăng nhập</Button>
    </div>
  );
};
export default LoginPage;
