import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import funcUrls from "../../backend/func2url.json";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(funcUrls.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: data.error || "Что-то пошло не так",
        });
        return;
      }

      toast({
        title: "Аккаунт создан!",
        description: `Добро пожаловать, ${data.user.username}`,
      });
      navigate("/");
    } catch {
      toast({
        variant: "destructive",
        title: "Ошибка сети",
        description: "Не удалось подключиться к серверу",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-svh bg-background flex flex-col items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,153,0,0.08)_0%,transparent_60%)]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8">
            <Logo className="w-[140px] mx-auto" />
          </Link>
          <h1 className="text-3xl font-sentient font-bold text-foreground">
            Создать аккаунт
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-3">
            Начните торговать криптовалютой за минуту
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-mono text-foreground/70 mb-2 uppercase">
              Имя пользователя
            </label>
            <Input
              type="text"
              placeholder="CryptoTrader"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
              required
              minLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-foreground/70 mb-2 uppercase">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-foreground/70 mb-2 uppercase">
              Пароль
            </label>
            <Input
              type="password"
              placeholder="Минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary"
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full btn-glow mt-8"
            disabled={loading}
          >
            {loading ? "[Создание...]" : "[Зарегистрироваться]"}
          </Button>
        </form>

        <p className="text-center text-sm font-mono text-muted-foreground mt-8">
          Уже есть аккаунт?{" "}
          <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
