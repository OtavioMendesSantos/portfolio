import { Box, Chip, Container, Divider, Grid, Stack, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { applyOpacity } from '../../utils/utils';
import BoxSection from '../common/BoxSection';
import { StyledTypography as Typography } from '../Styled/StyledComponents';

interface SkillGroup {
  id: string;
  category: string;
  technologies: string[];
}

const Skills = ({ className }: { className?: string }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const skillGroups: SkillGroup[] = useMemo(() => ([
    {
      id: 'backend',
      category: t('sections.skills.categories.backend'),
      technologies: ['Go', 'Node.js', 'NestJS', 'Express', 'REST APIs', 'WebSockets'],
    },
    {
      id: 'frontend',
      category: t('sections.skills.categories.frontend'),
      technologies: ['React', 'TypeScript', 'Vue.js', 'Redux', 'Tailwind CSS', 'SASS'],
    },
    {
      id: 'database',
      category: t('sections.skills.categories.database'),
      technologies: ['PostgreSQL', 'MongoDB', 'NoSQL', 'Prisma', t('sections.skills.technologies.queryOptimization')],
    },
    {
      id: 'devops',
      category: t('sections.skills.categories.devops'),
      technologies: ['GCP', 'Docker', 'Linux', 'CI/CD', 'Grafana', 'Prometheus'],
    },
  ]), [t]);

  return (
    <BoxSection title={t('sections.skills.title')} className={className}>
      <Typography indicate variant="h1" sx={{ mb: 6 }}>{t('sections.skills.title')}</Typography>

      <Container sx={{ px: { xs: 0, sm: 3 } }}>
        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            backgroundColor: applyOpacity(theme.palette.background.default, 0.72),
          }}
        >
          {skillGroups.map((group, index) => (
            <Box key={group.id}>
              <Grid
                container
                spacing={{ xs: 1.5, md: 3 }}
                sx={{
                  alignItems: { xs: 'flex-start', md: 'center' },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 2, sm: 2.5 },
                }}
              >
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      lineHeight: 1.35,
                    }}
                  >
                    {group.category}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                  <Stack direction="row" useFlexGap sx={{ gap: 1, flexWrap: "wrap" }}>
                    {group.technologies.map((technology) => (
                      <Chip
                        key={technology}
                        label={technology}
                        size="small"
                        variant="outlined"
                        sx={{
                          color: theme.palette.text.primary,
                          borderColor: applyOpacity(theme.palette.primary.main, 0.42),
                          backgroundColor: applyOpacity(theme.palette.primary.main, 0.05),
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>

              {index < skillGroups.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      </Container>
    </BoxSection>
  );
};

export default Skills;
