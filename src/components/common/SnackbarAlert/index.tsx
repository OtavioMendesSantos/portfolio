import { Alert, IconButton, Portal, Slide, Snackbar, SnackbarProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

/**
 * Tipos de severidade possíveis para o SnackbarAlert.
 */
type Severity = 'success' | 'info' | 'warning' | 'error';

/**
 * Propriedades aceitas pelo componente `SnackbarAlert`.
 *
 * @interface SnackbarAlertProps
 * @extends SnackbarProps
 * @property {string} [message] - Texto da mensagem exibida no Snackbar.
 * @property {boolean} open - Indica se o Snackbar está aberto ou fechado.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setOpen - Função que altera o estado de `open`.
 * @property {number} [duration] - Duração da exibição do Snackbar, em milissegundos. O padrão é 0 (sem auto-fechamento).
 * @property {Severity} [severity] - Nível de severidade da mensagem (`success`, `info`, `warning`, `error`). O padrão é `success`.
 * @property {function(React.SyntheticEvent | Event, string): void} [handleClose] - Função executada ao fechar o Snackbar. O padrão é fechar o Snackbar.
 * @property {SnackbarOrigin} [anchorOrigin] - Posição de origem do Snackbar na tela. O padrão é `{ vertical: 'top', horizontal: 'right' }`.
 */
interface SnackbarAlertProps {
    message?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    duration?: number;
    severity?: Severity;
    handleClose?: (event: React.SyntheticEvent | Event, reason: string) => void;
    anchorOrigin?: SnackbarProps['anchorOrigin'];
}

/**
 * Componente `SnackbarAlert`
 * 
 * Um componente que exibe uma mensagem de alerta em um Snackbar, utilizando a Material-UI. Pode ser configurado com diferentes níveis de severidade e se fecha automaticamente após um tempo configurável.
 *
 * @component
 * @param {SnackbarAlertProps} props - As propriedades do componente.
 * @returns {JSX.Element} Retorna o componente `SnackbarAlert`.
 * 
 * @example
 * // Exemplo de uso básico do SnackbarAlert
 * <SnackbarAlert
 *   message="Operação realizada com sucesso!"
 *   open={open}
 *   setOpen={setOpen}
 *   duration={3000}
 *   severity="success"
 *   handleClose={(event, reason) => { console.log('Snackbar fechado:', reason); }}
 * />
 * 
@example
 * // Exemplo de uso integrado com o hook useSnackbar
 * const ExampleComponent = () => {
 *   const messageSnackbar = useSnackbar();
 * 
 *   const handleShowSuccess = () => {
 *     showSuccess('Operação realizada com sucesso!', 3000});
 *   };
 * 
 *   const handleShowError = () => {
 *     showError('Ocorreu um erro!', duration: 3000);
 *   };
 * 
 *   return (
 *     <div>
 *       <Button variant="contained" color="primary" onClick={handleShowSuccess}>
 *         Mostrar Sucesso
 *       </Button>
 *       <Button variant="contained" color="secondary" onClick={handleShowError}>
 *         Mostrar Erro
 *       </Button>
 * 
 *       <SnackbarAlert {...messageSnackbar} />
 *     </div>
 *   );
 * };
 * 
 * export default ExampleComponent;
 */
const SnackbarAlert = ({
    message = '',
    open,
    setOpen,
    duration = 0,
    severity = 'success',
    handleClose = () => { setOpen(false) },
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
}: SnackbarAlertProps): JSX.Element => {

    /**
   * Função interna para lidar com o fechamento do alerta.
   * 
   * @param {React.SyntheticEvent | Event} event - O evento de fechamento.
   */
    const onCloseAlert = (event: React.SyntheticEvent | Event) => {
        if (handleClose) {
            handleClose(event, 'close');
        } else {
            setOpen(false);
        }
    }

    return (
        <Portal>
            {/* Garante a renderização do componente fora do aninhameto padrão do DOM */}
            <Snackbar
                open={open}
                {...(duration !== 0 && { autoHideDuration: duration })}
                anchorOrigin={anchorOrigin}
                slots={{ transition: Slide }}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={(event: React.SyntheticEvent | Event) => onCloseAlert(event)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            >
                <Alert
                    onClose={onCloseAlert}
                    severity={severity}
                    sx={{
                        width: '100%',
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Portal >
    )
}

export default SnackbarAlert