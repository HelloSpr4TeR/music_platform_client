import { Card, Container, Grid2, Step, StepLabel, Stepper } from '@mui/material'
import React, { ReactNode } from 'react'
import styles from '../styles/CreatePage.module.scss'

interface StepWrapperProps {
    activeStep: number
    children: ReactNode
    className?: string;
}

const steps = ['Введите информацию о треке', 'Загрузите обложку трека', 'Загрузите трек']

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children, className }) => {
    return (
        <Container className={className}>
            <div className={styles.stepperWrapper}>
                <Stepper activeStep={activeStep} className={styles.stepper}>
                    {steps.map((_, index) =>
                        <Step key={index} completed={activeStep > index}>
                            <StepLabel />
                        </Step>
                    )}
                </Stepper>
                <div className={styles.stepLabelText}>
                    {steps[activeStep]}
                </div>
            </div>

            <Grid2 container justifyContent="center" style={{ margin: '70px 0', height: 270 }}>
                <Card style={{ width: 600 }}>
                    {children}
                </Card>
            </Grid2>
        </Container>
    )
}

export default StepWrapper