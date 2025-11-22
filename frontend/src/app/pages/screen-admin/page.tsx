import Image from "next/image";
import WhiteHeader from "../../../components/white_header";

export default function TelaAdmin() {
  const usuarios = Array(6).fill({ nome: "Fulano de Tal" });

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/assets/images/fundo_somos.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Sobreposição branca translúcida */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* Cabeçalho */}
      <div className="relative z-10">
        <Header />
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex flex-col items-center justify-start p-10">
        {/* Barra de pesquisa e filtro */}
        <div className="flex flex-wrap justify-end items-center gap-6 mb-12 w-full max-w-6xl pr-15">
          {/* Campo de pesquisa */}
          <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-lg w-80">
            <input
              type="text"
              placeholder="Pesquisa"
              className="flex-1 outline-none bg-transparent text-gray-700 text-lg"
            />
            <Image
              src="/assets/images/lupa.svg"
              alt="Buscar"
              width={26}
              height={26}
            />
          </div>

          {/* Botão de filtro */}
          <div className="flex items-center justify-between bg-white rounded-full px-6 py-3 shadow-lg cursor-pointer hover:shadow-xl transition w-56">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/images/mdi_filter.png"
                alt="Filtro"
                width={24}
                height={24}
              />
              <span className="text-[#009B9E] font-semibold text-lg">ALUNOS</span>
            </div>
            <Image
              src="/assets/images/listar_alunos.png"
              alt="Listar"
              width={22}
              height={22}
            />
          </div>
        </div>

        {/* Grade de cartões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
          {usuarios.map((user, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl shadow-xl p-10 w-80 h-96 flex flex-col items-center transition-transform hover:scale-[1.03]"
            >
              {/* Ícone três pontos */}
              <button className="absolute top-5 right-5">
                <Image
                  src="/assets/images/tres_pontos_bolinha.png"
                  alt="Opções"
                  width={8}
                  height={28}
                  className="object-contain"
                />
              </button>

              {/* Foto de perfil */}
              <Image
                src="/assets/images/circulo_perfil.png"
                alt="Perfil"
                width={100}
                height={100}
                className="mb-6"
              />

              {/* Nome */}
              <p className="text-2xl font-semibold text-gray-800 mb-6">
                {user.nome}
              </p>

              {/* Botão */}
              <button className="bg-[#009B9E] text-white rounded-full px-6 py-3 text-base font-semibold shadow-md hover:bg-[#007f80] transition">
                Verificar perfil
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
