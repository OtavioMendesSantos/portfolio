import { Box, Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoxSection from '../common/BoxSection';
import { StyledTypography as Typography } from '../Styled/StyledComponents';

interface Task {
    title: string;
    description: string;
}

interface ExperienceTranslation {
    position: string;
    company: string;
    startMonth: number;
    startYear: number;
    endMonth?: number;
    endYear?: number;
    isCurrent?: boolean;
    tasks?: Record<string, Task>;
}

interface ExperienceItem extends ExperienceTranslation {
    id: string;
    tasks: Record<string, Task>;
}

const getDate = (year: number, month: number) => new Date(year, month - 1, 1);

const formatMonthYear = (year: number, month: number, language: string) => {
    return new Intl.DateTimeFormat(language, {
        month: 'long',
        year: 'numeric',
    }).format(getDate(year, month));
};

const getEndDate = (experience: ExperienceItem) => {
    if (experience.isCurrent) return new Date();
    if (!experience.endYear || !experience.endMonth) return getDate(experience.startYear, experience.startMonth);

    return getDate(experience.endYear, experience.endMonth);
};

const getDurationInMonths = (experience: ExperienceItem) => {
    const endDate = getEndDate(experience);
    const months =
        (endDate.getFullYear() - experience.startYear) * 12 +
        endDate.getMonth() -
        (experience.startMonth - 1) +
        1;

    return Math.max(1, months);
};

const formatDuration = (totalMonths: number, language: string) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const isEnglish = language.startsWith('en');
    const parts: string[] = [];

    if (years > 0) {
        parts.push(isEnglish
            ? `${years} ${years === 1 ? 'year' : 'years'}`
            : `${years} ${years === 1 ? 'ano' : 'anos'}`);
    }

    if (months > 0) {
        parts.push(isEnglish
            ? `${months} ${months === 1 ? 'month' : 'months'}`
            : `${months} ${months === 1 ? 'mês' : 'meses'}`);
    }

    return parts.join(isEnglish ? ' and ' : ' e ');
};

const formatPeriod = (experience: ExperienceItem, language: string) => {
    const start = formatMonthYear(experience.startYear, experience.startMonth, language);
    const end = experience.isCurrent
        ? language.startsWith('en') ? 'Present' : 'Atualmente'
        : formatMonthYear(experience.endYear ?? experience.startYear, experience.endMonth ?? experience.startMonth, language);
    const duration = formatDuration(getDurationInMonths(experience), language);

    return `${start} - ${end} (${duration})`;
};

const Experience = ({ className }: { className?: string }) => {
    const theme = useTheme();
    const { t, i18n } = useTranslation();

    const experiencesData = t('sections.experience.items', { returnObjects: true }) as Record<string, ExperienceTranslation>;

    const experienceList: ExperienceItem[] = Object.entries(experiencesData)
        .map(([id, experience]) => ({
            ...experience,
            id,
            tasks: experience.tasks ?? {},
        }))
        .sort((a, b) => getEndDate(b).getTime() - getEndDate(a).getTime());

    return (
        <BoxSection title={t('sections.experience.title')} className={className}>
            <Typography indicate variant="h1" sx={{ mb: 2 }}>{t('sections.experience.title')}</Typography>

            <Stack spacing={4}>
                {experienceList.map((experience) => (
                    <Box
                        key={experience.id}
                        sx={{
                            borderLeft: `3px solid ${theme.palette.primary.main}`,
                            p: '0 1rem',
                        }}
                    >
                        <Typography variant="h2">{experience.position}</Typography>
                        <Typography variant="caption" sx={{ mb: 2, display: 'block' }}>
                            {experience.company} | {formatPeriod(experience, i18n.language)}
                        </Typography>

                        {Object.keys(experience.tasks).length > 0 && (
                            <>
                                <Typography variant="h3">{t('sections.experience.responsibilities')}</Typography>
                                <ul style={{ margin: '0', gap: 2 }}>
                                    {Object.values(experience.tasks).map((task) => (
                                        <li key={`${task.title}-${task.description}`}>
                                            <Typography>
                                                <strong style={{ color: theme.palette.primary.main }}>{task.title}:</strong> {task.description}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Box>
                ))}
            </Stack>
        </BoxSection>
    );
};

export default Experience;
