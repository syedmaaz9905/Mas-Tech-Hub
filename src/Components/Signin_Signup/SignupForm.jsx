import { Button, Stack, TextField, Typography, colors, Select, MenuItem, FormControl } from '@mui/material'
import React, { useState } from 'react'
import { ScreenMode } from '../../Pages/SigninPage'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({ onSwitchMode }) => {

    const [accountType, setAccountType] = useState('')

    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value)
    }

    const navigate = useNavigate();

    return (
        <Stack
            justifyContent='center'
            alignItems='center'
            sx={{
                height: '100%',
                color: colors.grey[800]
            }}
        >
            <Stack
                spacing={5}
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    px: { xs: 2, sm: 0 }
                }}
            >
                <Stack>
                    <Typography variant='h4' fontWeight={600} color={colors.grey[800]}>
                        Create an account
                    </Typography>

                    <Typography color={colors.grey[600]}>
                        necessitatibus assumenda repellat perferendis est reprehenderit maiores?
                    </Typography>
                </Stack>

                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Typography color={colors.grey[800]}>
                                Name
                            </Typography>
                            <TextField />
                        </Stack>

                        <Stack spacing={1}>
                            <Typography color={colors.grey[800]}>
                                Email
                            </Typography>
                            <TextField />
                        </Stack>

                        <Stack spacing={1}>
                            <Typography color={colors.grey[800]}>
                                Password
                            </Typography>
                            <TextField type='password' />
                        </Stack>

                        <Stack spacing={1}>
                            <Typography color={colors.grey[800]}>
                                Account Type
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="account-type-label"
                                    id="account-type"
                                    value={accountType}
                                    onChange={handleAccountTypeChange}
                                >
                                    <MenuItem value="admin">Admin Account</MenuItem>
                                    <MenuItem value="volunteer">Volunteer Account</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Button
                        variant='contained'
                        size='large'
                        sx={{
                            backgroundColor: colors.grey[800],
                            "&:hover": {
                                backgroundColor: colors.grey[600]
                            }
                        }}
                        onClick={()=>navigate('/dashboard')}
                    >
                        SignIn
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Typography>
                        Already have an account?
                    </Typography>
                    <Typography
                        onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
                        fontWeight={600}
                        sx={{
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        Sign in
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default SignupForm