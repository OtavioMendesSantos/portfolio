import { Box, Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StyledTypography as Typography } from '../Styled/StyledComponents';
import BoxSection from '../common/BoxSection';

interface Task {
    title: string;
    description: string;
}

interface ExperienceItem {
    id: string;
    position: string;
    company: string;
    tasks: Record<string, Task>;
}

const Experience = ({ className }: { className?: string }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const experiencesData = t('sections.experience.items', { returnObjects: true }) as Record<string, any>;

    const experienceList: ExperienceItem[] = Object.keys(experiencesData).map(key => ({
        id: key,
        position: experiencesData[key].position,
        company: experiencesData[key].company,
        tasks: experiencesData[key].tasks
    }));


    return (
        <BoxSection title={t('sections.experience.title')} className={className}>
            <Typography indicate variant="h1" sx={{ mb: 2 }}>{t('sections.experience.title')}</Typography>

            <Stack spacing={4}>
                {experienceList.map((exp) => (
                    <Box
                        key={exp.id}
                        sx={{
                            borderLeft: `3px solid ${theme.palette.primary.main}`,
                            p: '0 1rem',
                        }}
                    >
                        <Typography variant="h2">{exp.position}</Typography>
                        <Typography variant="caption" sx={{ mb: 2, display: 'block' }}>{exp.company}</Typography>

                        {exp.tasks && Object.keys(exp.tasks).length > 0 && (
                            <>
                                <Typography variant="h3">{t('sections.experience.responsibilities')}</Typography>
                                <ul style={{ margin: '0', gap: 2 }}>
                                    {Object.values(exp.tasks).map((task: any, index: number) => (
                                        <li key={index}>
                                            <Typography><strong style={{ color: theme.palette.primary.main }}>{task.title}:</strong> {task.description}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Box>
                ))}
            </Stack>
        </BoxSection>
    )
}

export default Experience
