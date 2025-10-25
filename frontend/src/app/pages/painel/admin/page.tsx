import Header from "@/app/components/white_header";
import Icons from "@/app/components/assets/icons";
import Image from "@/app/components/assets/images";
import NextImage from "next/image";

export default function TelaAdmin() {
  const usuarios = Array(6).fill({ nome: "Fulano de Tal" });

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${Image.fundoSomos})`,
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
            <NextImage
              src={Icons.lupa}
              alt="Buscar"
              width={26}
              height={26}
            />
          </div>

          {/* Botão de filtro */}
          <div className="flex items-center justify-between bg-white rounded-full px-6 py-3 shadow-lg cursor-pointer hover:shadow-xl transition w-56">
            <div className="flex items-center gap-3">
              <NextImage
                src={Icons.mdi_filtro}
                alt="Filtro"
                width={24}
                height={24}
              />
              <span className="text-[#009B9E] font-semibold text-lg">ALUNOS</span>
            </div>
            <NextImage
              src={Icons.seta_baixo}
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
                <NextImage
                  src={Icons.icone_3pontos}
                  alt="Opções"
                  width={8}
                  height={28}
                  className="object-contain"
                />
              </button>

              {/* Foto de perfil */}
              <NextImage
                src={Icons.circuloPerfil}
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
