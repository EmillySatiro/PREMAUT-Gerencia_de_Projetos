"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import TopBar from "@/app/components/TopBar";
import Icons from "@/app/components/assets/icons";
import Image from "@/app/components/assets/images";
import NextImage from "next/image";

export default function TelaAdmin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("ALUNO");
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase client

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

  const supabase = createClient(supabaseUrl, supabaseKey);

  const filterOptions = [
    "PACIENTE",
    "MONITOR",
    "PROFESSOR",
    "FAMILIAR",
    "ALUNO",
    "COMUM",
  ];

  // Function to fetch users based on filter
  const fetchUsers = async (tipoUsuario: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Usuarios")
        .select("id, nome")
        .eq("tipo_usuario", tipoUsuario.toLowerCase());

      if (error) {
        console.error("Error fetching users:", error);
        setUsuarios([]);
      } else {
        setUsuarios(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when component mounts or filter changes
  useEffect(() => {
    fetchUsers(selectedFilter);
  }, [selectedFilter]);

  const handleFilterChange = (option: string) => {
    setSelectedFilter(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopBar */}
      <TopBar background_image={Image.fundoSomos} />

      {/* Conteúdo principal */}
      <main className="flex-1 bg-white px-8 py-10">
        {/* Barra de pesquisa e filtro */}
        <div className="flex flex-wrap justify-end items-center gap-6 mb-12 w-full max-w-6xl pr-15">
          {/* Campo de pesquisa */}
          <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-lg w-80">
            <input
              type="text"
              placeholder="Pesquisa"
              className="flex-1 outline-none bg-transparent text-gray-700 text-lg"
            />
            <NextImage src={Icons.lupa} alt="Buscar" width={26} height={26} />
          </div>

          {/* Botão de filtro com dropdown */}
          <div className="relative">
            <div
              className="flex items-center justify-between bg-white rounded-full px-6 py-3 shadow-lg cursor-pointer hover:shadow-xl transition w-56"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center gap-3">
                <NextImage
                  src={Icons.mdi_filtro}
                  alt="Filtro"
                  width={24}
                  height={24}
                />
                <span className="text-[#009B9E] font-semibold text-lg">
                  {selectedFilter}
                </span>
              </div>
              <NextImage
                src={Icons.seta_baixo}
                alt="Listar"
                width={22}
                height={22}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl z-10 overflow-hidden">
                {filterOptions.map((option, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleFilterChange(option)}
                  >
                    <span className="text-[#009B9E] font-semibold text-lg">
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grade de cartões */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="text-[#009B9E] text-xl">Carregando...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {usuarios.length > 0 ? (
              usuarios.map((user, index) => (
                <div
                  key={user.id}
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
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-xl">
                Nenhum usuário encontrado para este filtro
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}