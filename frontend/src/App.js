importar React, { useState, useEffect } de "react";

importar "react-toastify/dist/ReactToastify.css";
importar { QueryClient, QueryClientProvider } de "react-query";
importar lightBackground de '../src/assets/wa-background-light.png';
importar darkBackground de '../src/assets/wa-background-dark.jpg';
importar { ptBR } de "@material-ui/core/locale";
importar {createTheme, ThemeProvider} de "@material-ui/core/styles";
importar { useMediaQuery } de "@material-ui/core";
importar ColorModeContext de "./layout/themeContext";
importar { SocketContext, SocketManager } de './context/Socket/SocketContext';

importar rotas de "./routes";

const queryClient = novo QueryClient();

const Aplicativo = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefere-color-scheme: escuro)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [modo, setMode] = useState(temapreferido ? temapreferido : prefereModoEscuro ? "escuro" : "claro");

    const colorMode = React.useMemo(
        () => ({
            alternarColorMode: () => {
                setMode((prevMode) => (prevMode === "claro" ? "escuro" : "claro"));
            },
        }),
        []
    );

    const tema = criarTema(
        {
            Estilos de barra de rolagem: {
                "&::-webkit-scrollbar": {
                    largura: '8px',
                    altura: '8px',
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inserir 0 0 6px rgba(0, 0, 0, 0.3)',
                    Cor de fundo: "#4287f5",
					borderRadius: "8px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    largura: "8px",
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: modo === "luz" ? "#F3F3F3" : "#333333",
					borderRadius: "8px",
                },
            },
            paleta: {
                tipo: modo,
                primário: { principal: modo === "luz" ? "#4287f5" : "#FFFFFF" },
				sair: { main: mode === "light" ? "#4287f5" : "#333" },
				vcard: { principal: modo === "luz" ? "#4287f5" : "#666" },
                textoPrimário: modo === "luz" ? "#4287f5" : "#FFFFFF",
                borderPrimary: modo === "luz" ? "#4287f5" : "#FFFFFF",
                escuro: { principal: modo === "claro" ? "#333333" : "#F3F3F3" },
                luz: { principal: modo === "luz" ? "#F3F3F3" : "#333333" },
                tabHeaderBackground: modo === "light" ? "#EEE" : "#666",
                optionsBackground: modo === "light" ? "#fafafa" : "#333",
				opções: modo === "light" ? "#fafafa" : "#666",
				fontecor: modo === "light" ? "#128c7e" : "#fff",
                fancyBackground: modo === "light" ? "#fafafa" : "#333",
				bordabox: modo === "light" ? "#eee" : "#333",
				newmessagebox: modo === "light" ? "#eee" : "#333",
				inputdigita: modo === "luz" ? "#fff" : "#666",
				contactdrawer: modo === "luz" ? "#fff" : "#666",
				anúncios: modo === "light" ? "#ededed" : "#333",
				login: modo === "light" ? "#fff" : "#1C1C1C",
				anúnciospopover: modo === "light" ? "#fff" : "#666",
				lista de bate-papo: modo === "light" ? "#eee" : "#666",
				boxlist: modo === "light" ? "#ededed" : "#666",
				boxchatlist: modo === "light" ? "#ededed" : "#333",
                total: modo === "luz" ? "#fff" : "#222",
                messageIcons: modo === "claro" ? "cinza" : "#F3F3F3",
                inputBackground: modo === "luz" ? "#FFFFFF" : "#333",
                barraSuperior: modo === "luz" ? "gradiente-linear(para a direita, #4287f5, #4287f5 , #4287f5)" : "#666",
				boxticket: modo === "luz" ? "#EEE" : "#666",
				campaigntab: modo === "light" ? "#ededed" : "#666",
				mediainput: modo === "light" ? "#ededed" : "#1c1c1c",
            },
            modo,
        },
        localidade
    );

    useEfeito(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const navegadorLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        se (browserLocale === "ptBR") {
            definirLocalidade(ptBR);
        }
    }, []);

    useEfeito(() => {
        window.localStorage.setItem("tema preferido", modo);
    }, [modo]);



    retornar (
        <ColorModeContext.Provider valor={{ colorMode }}>
            <ThemeProvider tema={tema}>
                <QueryClientProvider cliente={queryClient}>
                  <SocketContext.Provider valor={SocketManager}>
                      <Rotas />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </Provedor de Tema>
        </ColorModeContext.Provider>
    );
};

exportar aplicativo padrão;
