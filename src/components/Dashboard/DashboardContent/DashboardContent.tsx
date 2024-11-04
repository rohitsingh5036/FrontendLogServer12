import { useState, useEffect } from 'react';
import { Container, Grid, SimpleGrid, rem, Text, Card, Group, Modal } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ApplicationsTable from '@/components/Applications/ApplicationsTable';

const PRIMARY_COL_HEIGHT = rem(300);

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export interface DashboardContentProps {
    initialUsername: string;
    lastLoginTime: string;
}

export function DashboardContent({ initialUsername, lastLoginTime }: DashboardContentProps) {
    const [username, setUsername] = useState<string>(initialUsername || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applications, setApplications] = useState<any[]>([]);
    const [logData, setLogData] = useState({ appName: "", url: "", type: "Client", token: "" });
    const [urlError, setUrlError] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    const visitsChartData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Profile Visits',
                data: [30, 45, 50, 40, 60, 75, 90],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setUrlError("");
        setErrorMessage("");  // Reset error message when opening modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    function handleChange(e: any) {
        const { name, value } = e.target;
        setLogData({ ...logData, [name]: value });
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        const { appName, url, type, token } = logData;

        try {
            const response = await axios.post("http://localhost:3000/project/post", { 
                project_name: appName, 
                project_description: url, 
                script_type: type,
                token : token
            });
            navigate('/applications');
        } catch (error) {
            console.log("error in creating application", error);
            setErrorMessage("Error in creating application. Please login again.");
        }
    }

    return (
        <Container my="md" style={{ backgroundColor: '#191430' }}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} style={{ padding: '2rem' }} spacing="md">
                <Card shadow="sm" padding="lg" radius="md" style={{ height: '35rem' }}>
                    <Text size="xl" style={{ marginBottom: '1rem' }}>
                        Welcome, {username}!
                    </Text>
                    <Text size="md" color="dimmed">
                        Here’s an overview of your account and activities.
                    </Text>

                    <div style={{ marginTop: '2rem' }}>
                        <Text size="lg" mb="xs">
                            Profile Visits Over the Week
                        </Text>
                        <Line data={visitsChartData} options={{ responsive: true }} />
                    </div>
                </Card>

                <Grid gutter="md">
                    <Grid.Col>
                        <Card shadow="sm" padding="lg" radius="md" style={{ height: SECONDARY_COL_HEIGHT }}>
                            <Group>
                                <Text size="lg">Recent Activity</Text>
                            </Group>
                            <Text size="md">Last Login: {lastLoginTime}</Text>
                            <Text size="md" mt="sm">
                                5 New Messages
                            </Text>
                            <Text size="md">3 Pending Tasks</Text>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="md" style={{ height: SECONDARY_COL_HEIGHT }}>
                            <Text size="lg">Profile Visits</Text>
                            <Text size="md">24 in the last 7 days</Text>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card shadow="sm" padding="lg" radius="md" style={{ height: SECONDARY_COL_HEIGHT }}>
                            <Text size="lg">Active Sessions</Text>
                            <Text size="md">2 sessions active</Text>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            style={{ height: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                            onClick={handleOpenModal}
                        >
                            Create Application
                            <IconPlus style={{ marginLeft: '0.5rem', height: '20rem' }} />
                        </Card>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>

            <Modal opened={isModalOpen} onClose={handleCloseModal} centered withCloseButton={false}>
                <Card padding="lg" shadow="lg" radius="md">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="appName" className="text-base font-medium">
                                        Application Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                            type="text"
                                            placeholder="Application Title"
                                            id="appName"
                                            value={logData.appName}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            name="appName"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="url" className="text-base font-medium">
                                        URL
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ${urlError ? 'border-red-500' : ''}`}
                                            placeholder="URL"
                                            id="url"
                                            value={logData.url}
                                            onChange={handleChange}
                                            name="url"
                                        />
                                        {urlError && <Text color="red" size="sm">{urlError}</Text>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="type" className="text-base font-medium">
                                        Type
                                    </label>
                                    <div className="mt-2">
                                        <select name="type" onChange={handleChange} value={logData.type}>
                                            <option value="Client">Client</option>
                                            <option value="Server">Server</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="token" className="text-base font-medium">
                                        Token
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                            type="text"
                                            placeholder="Token"
                                            id="token"
                                            value={logData.token}
                                            onChange={handleChange}
                                            name="token"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white"
                                        style={{ backgroundColor: '#191430' }}
                                    >
                                        Create Application
                                    </button>
                                </div>

                                {errorMessage && (
                                    <Text color="red" size="sm" mt="sm">
                                        {errorMessage}
                                    </Text>
                                )}
                            </div>
                        </form>
                    </div>
                </Card>
            </Modal>
        </Container>
    );
}

export default DashboardContent;
