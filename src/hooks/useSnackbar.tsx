import { useState } from "react";

/**
 * Tipos de severidade possíveis para o Snackbar.
 */
type SeverityType = 'success' | 'info' | 'warning' | 'error';

/**
 * Propriedades para inicializar o hook `useSnackbar`.
 * 
 * @interface UseSnackbarProps
 * @property {number} [duration] - Duração do Snackbar em milissegundos. Se não especificado, será 0 (sem auto-fechamento).
 * @property {boolean} [initialOpen] - Define se o Snackbar começa aberto. O padrão é `false`.
 * @property {string} [message] - Mensagem inicial a ser exibida no Snackbar. O padrão é uma string vazia.
 * @property {SeverityType} [severity] - Tipo de severidade inicial do Snackbar. O padrão é `success`.
 */
interface UseSnackbarProps {
    duration?: number;
    initialOpen?: boolean;
    message?: string;
    severity?: SeverityType;
}

/**
 * Propriedades para a função `show` do Snackbar.
 * 
 * @interface ShowSnackbarProps
 * @property {string} message - Mensagem a ser exibida no Snackbar.
 * @property {SeverityType} severity - Tipo de severidade do Snackbar.
 * @property {number} [duration] - Duração do Snackbar em milissegundos. Sobrescreve a duração inicial se especificado.
 */
interface ShowSnackbarProps {
    message: string;
    severity: SeverityType;
    duration?: number;
}

/**
 * Valores retornados pelo hook `useSnackbar`.
 * 
 * @interface UseSnackbarReturn
 * @property {number} duration - Duração configurada para o Snackbar.
 * @property {boolean} open - Estado atual do Snackbar (aberto ou fechado).
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setOpen - Função para alterar o estado `open`.
 * @property {string} message - Mensagem atual exibida no Snackbar.
 * @property {React.Dispatch<React.SetStateAction<string>>} setMessage - Função para alterar a `message`.
 * @property {SeverityType} severity - Severidade atual do Snackbar.
 * @property {React.Dispatch<React.SetStateAction<SeverityType>>} setSeverity - Função para alterar a `severity`.
 * @property {function(ShowSnackbarProps): void} show - Função para exibir o Snackbar com as opções especificadas.
 * @property {function(string): void} showSuccess - Função para exibir uma mensagem de sucesso.
 * @property {function(string): void} showError - Função para exibir uma mensagem de erro.
 * @property {function(React.SyntheticEvent | Event, string): void} handleClose - Função para fechar o Snackbar.
 */
interface UseSnackbarReturn {
    duration: number;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    severity: SeverityType;
    setSeverity: React.Dispatch<React.SetStateAction<SeverityType>>;
    show: (options: ShowSnackbarProps) => void;
    showSuccess: (message: string, duration?: number) => void;
    showError: (message: string, duration?: number) => void;
    handleClose: (event: React.SyntheticEvent | Event, reason: string) => void;
}

/**
 * Hook personalizado `useSnackbar` para controlar a exibição de um Snackbar com severidade, duração e mensagem.
 * 
 * @param {UseSnackbarProps} [initialOptions] - Opções iniciais para configurar o Snackbar.
 * @returns {UseSnackbarReturn} - Retorna os métodos e propriedades para controlar o Snackbar.
 */
const useSnackbar = (
    initialOptions: UseSnackbarProps = { message: '', severity: 'success', initialOpen: false }
): UseSnackbarReturn => {
    const [open, setOpen] = useState(initialOptions.initialOpen || false);
    const [message, setMessage] = useState(initialOptions.message || '');
    const [severity, setSeverity] = useState<SeverityType>(initialOptions.severity as SeverityType || 'success');
    const duration = initialOptions?.duration || 0;

    /**
  * Exibe o Snackbar com as opções especificadas.
  * 
  * @param {ShowSnackbarProps} options - Opções para exibir o Snackbar.
  */
    const show = (
        { message, severity, duration }: ShowSnackbarProps
    ) => {
        if (typeof message === 'object') {
            setMessage(JSON.stringify(message));
        } else if (message) {
            setMessage(message);
        }

        setSeverity(severity);
        setOpen(true);

        const timeoutDuration = duration ?? 0;
        if (timeoutDuration > 0) {
            setTimeout(() => {
                setOpen(false);
            }, duration);
        }
    };


    /**
     * Exibe uma mensagem de sucesso no Snackbar.
     * 
     * @param {string} message - Mensagem a ser exibida.
     * @param {number} [duration] - Duração do Snackbar em milissegundos. Se não especificado, será 0 (sem auto-fechamento).
     */
    const showSuccess = (message: string, duration?: number) => show({ message, duration, severity: 'success' });

    /**
    * Exibe uma mensagem de erro no Snackbar.
    * 
    * @param {string} message - Mensagem a ser exibida.
    * @param {number} [duration] - Duração do Snackbar em milissegundos. Se não especificado, será 0 (sem auto-fechamento).
    */
    const showError = (message: string, duration?: number) => show({ message, duration, severity: 'error' });

    /**
    * Fecha o Snackbar, exceto quando o motivo for 'clickaway'.
    * 
    * @param {React.SyntheticEvent | Event} _ - Evento de fechamento do Snackbar.
    * @param {string} reason - Motivo do fechamento.
    */
    const handleClose = (_: React.SyntheticEvent | Event, reason: string) => {
        if (reason === 'clickaway') {
            // Evita fechar o Snackbar em determinados casos
            return;
        }
        setOpen(false);
    };

    return {
        duration,
        open,
        setOpen,
        message,
        setMessage,
        severity,
        setSeverity,
        show,
        showSuccess,
        showError,
        handleClose
    };
};

export default useSnackbar