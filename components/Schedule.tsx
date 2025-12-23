import React from 'react';
import { View, Text } from 'react-native';
import { Table, TableColumn } from '@/components/ui/table';

interface ScheduleRow {
    id: string;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
}

const SCHEDULE_DATA: ScheduleRow[] = [
    // Morning Block
    { id: '1', sunday: '9:00', monday: '9:10', tuesday: '9:10', wednesday: '9:10', thursday: '9:10', friday: '9:10' },
    { id: '2', sunday: '10:10', monday: '10:10', tuesday: '10:10', wednesday: '10:10', thursday: '10:10', friday: '10:10' },

    // Evening Block
    { id: '3', sunday: '17:00', monday: '', tuesday: '17:00', wednesday: '17:00', thursday: '17:00', friday: '12:10' },
    { id: '4', sunday: '18:00', monday: '18:00', tuesday: '18:00', wednesday: '', thursday: '18:00', friday: '' },
    { id: '5', sunday: '19:00', monday: '19:00', tuesday: '19:00', wednesday: '19:00', thursday: '19:00', friday: '' },
    { id: '6', sunday: '20:00', monday: '20:00', tuesday: '20:00', wednesday: '20:00', thursday: '20:00', friday: '' },
];

const renderCell = (time: string) => {
    if (!time) {
        return <View className="flex-1" />; // Empty placeholder
    }

    return (
        <View className="items-center justify-center p-2">
            <Text className="text-[10px] text-pink/80 uppercase mb-0.5 font-bold">WOD</Text>
            <Text className="text-white font-bold text-sm">
                {time}
            </Text>
        </View>
    );
};

const COLUMNS: TableColumn<ScheduleRow>[] = [
    { id: 'friday', header: 'שישי', accessorKey: 'friday', align: 'center', cell: (val) => renderCell(val) },
    { id: 'thursday', header: 'חמישי', accessorKey: 'thursday', align: 'center', cell: (val) => renderCell(val) },
    { id: 'wednesday', header: 'רביעי', accessorKey: 'wednesday', align: 'center', cell: (val) => renderCell(val) },
    { id: 'tuesday', header: 'שלישי', accessorKey: 'tuesday', align: 'center', cell: (val) => renderCell(val) },
    { id: 'monday', header: 'שני', accessorKey: 'monday', align: 'center', cell: (val) => renderCell(val) },
    { id: 'sunday', header: 'ראשון', accessorKey: 'sunday', align: 'center', cell: (val) => renderCell(val) },
];

export default function Schedule() {
    return (
        <View className="bg-background px-4 md:px-8 lg:px-12 py-20">
            <View className="max-w-6xl mx-auto w-full">
                <Text className="text-white text-3xl md:text-4xl font-bold text-center mb-12 writing-direction-rtl">
                    לוח אימונים
                </Text>

                <Table
                    data={SCHEDULE_DATA}
                    columns={COLUMNS}
                    pagination={false}
                    searchable={false}
                    sortable={false}
                    filterable={false}
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        borderColor: 'rgba(216, 27, 96, 0.2)',
                        borderWidth: 1,
                        borderRadius: 16,
                    }}
                    headerStyle={{
                        backgroundColor: 'rgba(216, 27, 96, 0.1)',
                        borderBottomWidth: 1,
                        borderColor: 'rgba(216, 27, 96, 0.2)',
                        height: 50
                    }}
                    rowStyle={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(216, 27, 96, 0.1)',
                        height: 70
                    }}
                    cellStyle={{
                        borderRightWidth: 1,
                        borderRightColor: 'rgba(216, 27, 96, 0.1)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />
            </View>
        </View>
    );
}
