import { Box, Chip, Stack, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BoxSection from '../common/BoxSection';
import { StyledTypography as Typography } from '../Styled/StyledComponents';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ExperienceRaw {
    company: string;
    position: string;
    startMonth: number;
    startYear: number;
    endMonth?: number;
    endYear?: number;
    isCurrent?: boolean;
    summary: string;
    highlights: string[];
    technologies: string[];
}

interface Role {
    position: string;
    startMonth: number;
    startYear: number;
    endMonth?: number;
    endYear?: number;
    isCurrent?: boolean;
    summary: string;
    highlights: string[];
}

interface GroupedExperience {
    company: string;
    roles: Role[];
    technologies: string[];
    maxEndDate: Date;
    minStartDate: Date;
}

const getDate = (year: number, month: number) => new Date(year, month - 1, 1);

const getRoleEndDate = (role: Role) => {
    if (role.isCurrent) return new Date();
    if (role.endYear && role.endMonth) return getDate(role.endYear, role.endMonth);
    return getDate(role.startYear, role.startMonth);
};

const formatMonthYear = (year: number, month: number, language: string) => {
    return new Intl.DateTimeFormat(language, {
        month: 'short',
        year: 'numeric',
    }).format(getDate(year, month));
};

const calculateDuration = (start: Date, end: Date, language: string) => {
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    months = Math.max(1, months);

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const isEn = language.startsWith('en');
    const parts: string[] = [];

    if (years > 0) {
        parts.push(`${years}${isEn ? (years === 1 ? 'yr' : 'yrs') : (years === 1 ? 'a' : 'a')}`);
    }
    if (remainingMonths > 0) {
        parts.push(`${remainingMonths}${isEn ? (remainingMonths === 1 ? 'mo' : 'mos') : (remainingMonths === 1 ? 'm' : 'm')}`);
    }

    return parts.join(isEn ? ' ' : ' ');
};

const Experience = ({ className }: { className?: string }) => {
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const experiencesRaw = t('sections.experience.items', { returnObjects: true }) as Record<string, ExperienceRaw>;

    const groupedExperiences = useMemo(() => {
        const groups: Record<string, GroupedExperience> = {};

        Object.values(experiencesRaw).forEach((exp) => {
            if (!groups[exp.company]) {
                groups[exp.company] = {
                    company: exp.company,
                    roles: [],
                    technologies: [],
                    maxEndDate: new Date(0),
                    minStartDate: new Date(8640000000000000),
                };
            }

            const group = groups[exp.company];
            group.roles.push({
                position: exp.position,
                startMonth: exp.startMonth,
                startYear: exp.startYear,
                endMonth: exp.endMonth,
                endYear: exp.endYear,
                isCurrent: exp.isCurrent,
                summary: exp.summary,
                highlights: exp.highlights,
            });

            exp.technologies.forEach((tech) => {
                if (!group.technologies.includes(tech)) {
                    group.technologies.push(tech);
                }
            });

            const startDate = getDate(exp.startYear, exp.startMonth);
            const endDate = exp.isCurrent ? new Date() : (exp.endYear && exp.endMonth ? getDate(exp.endYear, exp.endMonth) : startDate);

            if (startDate < group.minStartDate) group.minStartDate = startDate;
            if (endDate > group.maxEndDate) group.maxEndDate = endDate;
        });

        return Object.values(groups)
            .map(group => ({
                ...group,
                roles: group.roles.sort((a, b) => getRoleEndDate(b).getTime() - getRoleEndDate(a).getTime())
            }))
            .sort((a, b) => b.maxEndDate.getTime() - a.maxEndDate.getTime());
    }, [experiencesRaw]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <BoxSection title={t('sections.experience.title')} className={className}>
            <Typography indicate variant="h1" sx={{ mb: 6 }}>
                {t('sections.experience.title')}
            </Typography>

            <Box sx={{ position: 'relative', ml: isMobile ? 2 : 1 }}>
                <Box
                    sx={{
                        position: 'absolute',
                        left: isMobile ? 0 : '140px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        backgroundColor: theme.palette.divider,
                        zIndex: 0,
                    }}
                />

                <Stack
                    component={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    spacing={6}
                >
                    {groupedExperiences.map((group) => (
                        <Box
                            key={group.company}
                            component={motion.div}
                            variants={itemVariants}
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: isMobile ? '-7px' : '133px',
                                    top: isMobile ? '24px' : '12px',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.background.paper,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    zIndex: 2,
                                }}
                            />

                            {!isMobile && (
                                <Box sx={{ width: '120px', textAlign: 'right', pr: 3, pt: 0.5 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', lineHeight: 1.2 }}>
                                        {calculateDuration(group.minStartDate, group.maxEndDate, i18n.language)}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.7rem' }}>
                                        {formatMonthYear(group.minStartDate.getFullYear(), group.minStartDate.getMonth() + 1, i18n.language)} - {group.roles.some(r => r.isCurrent) ? (i18n.language.startsWith('en') ? 'Present' : 'Atualmente') : formatMonthYear(group.maxEndDate.getFullYear(), group.maxEndDate.getMonth() + 1, i18n.language)}
                                    </Typography>
                                </Box>
                            )}

                            <Box sx={{ flex: 1, pl: isMobile ? 4 : 5 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="h2" sx={{ mb: 0.5, fontSize: '1.25rem', fontWeight: 800, color: 'text.primary' }}>
                                        {group.company}
                                    </Typography>
                                    
                                    {isMobile && (
                                        <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main', display: 'block', mb: 1 }}>
                                            {calculateDuration(group.minStartDate, group.maxEndDate, i18n.language)} • {formatMonthYear(group.minStartDate.getFullYear(), group.minStartDate.getMonth() + 1, i18n.language)} — {group.roles.some(r => r.isCurrent) ? (i18n.language.startsWith('en') ? 'Present' : 'Atualmente') : formatMonthYear(group.maxEndDate.getFullYear(), group.maxEndDate.getMonth() + 1, i18n.language)}
                                        </Typography>
                                    )}
                                </Box>

                                <Stack spacing={2.5}>
                                    {group.roles.map((role, idx) => (
                                        <Box key={idx}>
                                            <Typography variant="h3" sx={{ fontSize: '1.05rem', fontWeight: 700, mb: 0.5, color: 'primary.light' }}>
                                                {role.position}
                                            </Typography>
                                            
                                            <Typography variant="body2" sx={{ mb: 1.5, color: 'text.primary', opacity: 0.9, lineHeight: 1.5, fontSize: '0.9rem' }}>
                                                {role.summary}
                                            </Typography>

                                            <Box component="ul" sx={{ m: 0, pl: 2, mb: 2 }}>
                                                {role.highlights.map((highlight, hIdx) => (
                                                    <Box component="li" key={hIdx} sx={{ mb: 0.5 }}>
                                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                                            {highlight}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>

                                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                                    {group.technologies.map((tech) => (
                                        <Chip
                                            key={tech}
                                            label={tech}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                fontSize: '0.65rem',
                                                height: '20px',
                                                fontWeight: 600,
                                                borderColor: 'primary.dark',
                                                color: 'primary.light',
                                                backgroundColor: 'rgba(var(--mui-palette-primary-mainChannel), 0.05)',
                                                '&:hover': {
                                                    backgroundColor: 'primary.main',
                                                    color: 'primary.contrastText',
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </BoxSection>
    );
};

export default Experience;
