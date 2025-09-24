export default function TesteDark() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-green-300 p-10">
      <h1 className="text-2xl">Modo Claro</h1>
      <h1 className="dark:block hidden text-2xl">Modo Escuro</h1>
    </div>
  );
}