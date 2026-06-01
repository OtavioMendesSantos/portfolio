import { Box, Button, Container, Grid, Link, useTheme } from '@mui/material';
import { Chart, ChartData, ChartOptions, Tooltip as ChartTooltip, Filler, Legend, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import { useRef, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { applyOpacity } from '../../utils/utils';
import BoxSection from '../common/BoxSection';
import ImgWithLoading from '../common/ImgWithLoading';
import CustomModal from '../common/Modal';
import { StyledTypography as Typography } from '../Styled/StyledComponents';
import smartImage from '/assets/images/smart.png';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip, Legend);

interface SkillData {
  name: string;
  level: number;
  objetivo: number;
}

const skills: SkillData[] = [
  {
    name: 'HTML',
    level: 8,
    objetivo: 8,
  },
  {
    name: 'CSS',
    level: 9,
    objetivo: 10,
  },
  {
    name: 'JAVASCRIPT',
    level: 8,
    objetivo: 9,
  },
  {
    name: 'REACT',
    level: 8,
    objetivo: 9,
  },
  {
    name: 'TYPESCRIPT',
    level: 8,
    objetivo: 10,
  },
  {
    name: 'GIT',
    level: 6,
    objetivo: 6,
  },
  {
    name: 'REDUX',
    level: 6,
    objetivo: 6,
  },
  {
    name: 'NODEJS',
    level: 4,
    objetivo: 6,
  },
]

const Skills = ({ className }: { className?: string }) => {
  const chartRef = useRef<Chart<'radar'> | null>(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const data: ChartData<'radar'> = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: t('sections.skills.current'),
        data: skills.map(skill => skill.level),
        backgroundColor: applyOpacity(theme.palette.primary.main, 0.3),
        borderColor: theme.palette.primary.main,
        pointBackgroundColor: applyOpacity(theme.palette.primary.main, 0.1),
      },
      {
        label: t('sections.skills.target'),
        data: skills.map(skill => skill.objetivo),
        backgroundColor: applyOpacity(theme.palette.secondary.main, 0.3),
        borderColor: theme.palette.secondary.main,
        pointBackgroundColor: applyOpacity(theme.palette.secondary.main, 0.1),
      },
    ],
  };

  // Opções do gráfico do tipo Radar
  const options: ChartOptions<'radar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.primary.contrastText,
          font: {
            size: 14,
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          color: theme.palette.divider
        },
        grid: {
          color: theme.palette.divider
        },
        pointLabels: {
          color: theme.palette.primary.contrastText,
          font: {
            size: 14,
          }
        },
        ticks: {
          color: theme.palette.primary.contrastText,
          backdropColor: 'transparent'
        }
      },
    },
  };

  return (
    <BoxSection title={t('sections.skills.title')} className={className}>
      <Typography indicate variant='h1'>{t('sections.skills.title')}</Typography>
      <Container sx={{ height: '100%' }}>
        <Grid container sx={{ minHeight: '50vh', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Grid
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
          >
            <Radar
              ref={chartRef}
              data={data}
              options={options}
              style={{ height: '100%', width: '100%', aspectRatio: '1 / 1' }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6 }}
            sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}
          >
            <Typography variant='body1'>
              <Typography variant='overline'>1-3:</Typography> {t('sections.skills.basicKnowledge')}
            </Typography>
            <Typography variant='body1'>
              <Typography variant='overline'>4-6:</Typography> {t('sections.skills.intermediateKnowledge')}<br />
            </Typography>
            <Typography variant='body1'>
              <Typography variant='overline'>7-8:</Typography> {t('sections.skills.advancedKnowledge')}<br />
            </Typography>
            <Typography variant='body1'>
              <Typography variant='overline'>9-10:</Typography> {t('sections.skills.expertKnowledge')}<br />
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant='outlined' onClick={() => setOpen(true)}>{t('sections.skills.howEvaluate')}</Button>
            </Box>
          </Grid>
        </Grid>

      </Container>
      <CustomModal open={open} onClose={() => setOpen(false)} title={t('sections.skills.howEvaluate')} maxWidth="700px">
        <Box>
          <Typography variant="h3" sx={{ m: '1rem 0 .5rem 0' }}>{t('sections.skills.evaluationCriteria')}</Typography>
          <Typography
            variant="body1"
            sx={{ pl: 2 }}
            dangerouslySetInnerHTML={{ __html: t('sections.skills.evaluationCriteriaDescription') }}
          />

          <Typography variant="h3" sx={{ m: '1rem 0 .5rem 0' }}>
            {t('sections.skills.externalFeedback')}
          </Typography>
          <Typography
            variant="body1"
            sx={{ pl: 2 }}
            dangerouslySetInnerHTML={{ __html: t('sections.skills.externalFeedbackDescription') }}
          />

          <Typography variant="h3" sx={{ m: '1rem 0 .5rem 0' }}>{t('sections.skills.goals')}</Typography>
          <Typography
            variant="body1"
            sx={{ pl: 2 }}
            dangerouslySetInnerHTML={{ __html: t('sections.skills.goalsDescription') }}
          />

          <Typography variant="h3" sx={{ m: '1rem 0 .5rem 0' }}>{t('sections.skills.smartMethod')}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', maxWidth: '500px', margin: '0 auto 1rem' }}>
            <ImgWithLoading
              src={smartImage}
              alt='Metodologia SMART'
              imgProps={{
                style: { width: '100%', marginTop: '1rem', borderRadius: '.5rem' },
                onDragStart: (e) => e.preventDefault()
              }}
            />
            <Link
              href='https://marqponto.com.br/blog/tecnica-smart-saiba-como-usar/'
              target='_blank'
              variant="caption"
              rel="noreferrer noopen"
            >
              https://marqponto.com.br/blog/tecnica-smart-saiba-como-usar/
            </Link>
          </Box>
          <Typography
            variant="body1"
            sx={{ pl: 2 }}
            dangerouslySetInnerHTML={{ __html: t('sections.skills.smartMethodDescription') }}
          />

          <Typography variant="h3" sx={{ m: '1rem 0 .5rem 0' }}>{t('sections.skills.marketBenchmarking')}</Typography>
          <Typography
            variant="body1"
            sx={{ pl: 2 }}
            dangerouslySetInnerHTML={{ __html: t('sections.skills.marketBenchmarkingDescription') }}
          />
        </Box>
      </CustomModal>
    </BoxSection>
  );
};

export default Skills;
