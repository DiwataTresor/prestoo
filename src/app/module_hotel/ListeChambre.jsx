"use client"
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import DashboardBtn from "./../components/DashboardBtn"
import { CalendarCheck2Icon, CalendarClock, PlusCircle } from 'lucide-react';
import moment from 'moment'

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];
const ListeChambre = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 120,
                        }}
                    >
                        Recherche
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filtrer
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Fermer
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Chambre',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Categorie',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
        },
        {
            title: 'Statut',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nbre Jours reservés',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nbre Jours occupés',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Option',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    return (
        <div className='pt-10 '>
            <div className='flex gap-2 '>
                <DashboardBtn callback={() => {
                    alert("ok")
                }} cls={"bg-orange-400 border-1 text-white hover:bg-blue-200 transition-all cursor-pointer border-dashed border-white"} text={
                    <div className='flex flex-col items-center justify-center'>
                        <div><PlusCircle /></div>
                        <div>Enregistrer chambre</div>
                    </div>} />
                <DashboardBtn callback={() => {

                }} cls={"bg-blue-700 border-2 text-white hover:bg-blue-200 transition-all cursor-pointer border-dashed border-white"} text={
                    <div className='flex flex-col items-center justify-center'>
                        <div><CalendarClock /></div>
                        <div>Créer Reservation</div>
                    </div>} />
                <DashboardBtn text={"Total chambres"} badge={10} />
                <DashboardBtn text={"Chambres occupées"} badge={1} />
            </div>
            <div className='flex flex-row gap-3'>
                <div className='w-2/3'>
                    <Table columns={columns} dataSource={data} pagination={["topCenter"]} />
                </div>
                <div className='w-1/3'>
                    <Table columns={columns} dataSource={data} pagination={["topCenter"]} />
                </div>
                
            </div>
        </div>
    );
};
export default ListeChambre;