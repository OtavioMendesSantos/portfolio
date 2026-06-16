import { Button, CircularProgress, Container, Stack, TextField } from "@mui/material";
import emailjs from 'emailjs-com';
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useSnackbar from "../../hooks/useSnackbar";
import BoxSection from "../common/BoxSection";
import SnackbarAlert from "../common/SnackbarAlert";
import { StyledTypography } from "../Styled/StyledComponents";

const SendMessage = ({ className }: { className?: string }) => {
    const VITE_EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID
    const VITE_EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const VITE_EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const [loading, setLoading] = useState(false)
    const messageSnackbar = useSnackbar({ duration: 6000 })
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
    })

    const [touched, setTouched] = useState({
        name: false,
        email: false,
    });

    const formRef = useRef(null)

    const validateName = (name: string) => {
        if (name.length < 3) {
            return t('sections.contact.form.name.error');
        }
        return "";
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return t('sections.contact.form.email.error');
        }
        return "";
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        if (name === 'email') {
            setFormData({ ...formData, [name]: value.trim() })
        } else {
            setFormData({ ...formData, [name]: value })
        }
        if (name === "name" && touched.name) {
            setErrors({ ...errors, name: validateName(value) });
        } else if (name === "email" && touched.email) {
            setErrors({ ...errors, email: validateEmail(value.trim()) });
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setTouched({ ...touched, [name]: true });

        if (name === "name") {
            setErrors({ ...errors, name: validateName(value) });
        } else if (name === "email") {
            setErrors({ ...errors, email: validateEmail(value) });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);

        if (nameError || emailError) {
            setErrors({
                name: nameError,
                email: emailError,
            });
            return;
        }

        const serviceID = VITE_EMAILJS_SERVICE_ID
        const templateID = VITE_EMAILJS_TEMPLATE_ID
        const userID = VITE_EMAILJS_USER_ID

        if (serviceID === '' || templateID === '' || userID === '') {
            console.error('E-mailJS ID inválido');
            return
        }

        if (formRef.current === null) return
        setLoading(true)
        emailjs.sendForm(serviceID, templateID, formRef.current, userID)
            .then(() => {
                messageSnackbar.showSuccess(t('sections.contact.form.success'), 6000)
            })
            .catch((err) => {
                messageSnackbar.showError(t('sections.contact.form.error'), 6000)
                console.log('Erro ao enviar o email', err);
            })
            .finally(() => {
                setLoading(false)
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                })
                setErrors({
                    name: "",
                    email: "",
                })
                setTouched({
                    name: false,
                    email: false,
                })
            })
    }

    return (
        <>
            <BoxSection title={t('sections.contact.title')} className={className} sx={{}}>
                <StyledTypography variant="h1" indicate>{t('sections.contact.title')}</StyledTypography>
                <Container maxWidth="sm" sx={{ my: 4 }}>
                    <form onSubmit={handleSubmit} ref={formRef} >
                        <Stack sx={{ gap: 2 }}>
                            <TextField
                                size="small"
                                label={t('sections.contact.form.name.label')}
                                value={formData.name}
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                placeholder={t('sections.contact.form.name.placeholder')}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                size="small"
                                label={t('sections.contact.form.email.label')}
                                value={formData.email}
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                                placeholder={t('sections.contact.form.email.placeholder')}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                size="small"
                                label={t('sections.contact.form.message.label')}
                                value={formData.message}
                                onChange={handleChange}
                                name="message"
                                id="message"
                                multiline
                                rows={6}
                                placeholder={t('sections.contact.form.message.placeholder')}
                            />
                            <Button
                                disabled={(formData.name === "" || formData.email === "" || formData.message === "" || !!errors.name || !!errors.email) || loading}
                                variant="contained"
                                type="submit"
                            >
                                {loading ? <CircularProgress size={20} /> : t('sections.contact.form.button')}
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </BoxSection>
            <SnackbarAlert {...messageSnackbar} />
        </>
    )
}

export default SendMessage
