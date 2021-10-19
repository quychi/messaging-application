import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Avatar, Menu, Typography } from 'antd';

const viFlag = require('../../images/vietnam.png').default;
const enFlag = require('../../images/uk.png').default;

const languageMenu = [
    {
        value: 'vi',
        label: 'Tiếng Việt',
        flag: viFlag
    },
    {
        value: 'en',
        label: 'English',
        flag: enFlag
    }
];

const flags = {
    vi: viFlag,
    en: enFlag
};

const ChangeLanguageComponent = ({ size }) => {
    const { i18n } = useTranslation();
    const language = localStorage.getItem('language') || 'vi';
    const onSelectLanguage = ({ key }) => {
        localStorage.setItem('language', key);
        i18n.changeLanguage(key);
        window.location.reload();
    };

    const multiLanguageContent = () => {
        return (
            <Menu onClick={onSelectLanguage}>
                {languageMenu.map((i) => (
                    <Menu.Item key={i.value}>
                        <Avatar
                            style={{ marginRight: 5, borderRadius: 0 }}
                            src={i.flag}
                            size={16}
                            shape="square"
                        />
                        <Typography.Text style={{ fontSize: 12 }}>
                            {i.label}
                        </Typography.Text>
                    </Menu.Item>
                ))}
            </Menu>
        );
    };

    return (
        <Dropdown
            overlay={multiLanguageContent}
            trigger={['click']}
            placement="bottomRight"
            arrow
        >
            <Avatar
                style={{ cursor: 'pointer', borderRadius: 0 }}
                size={size || 20}
                src={flags[language]}
                shape="square"
            />
        </Dropdown>
    );
};

export default ChangeLanguageComponent;
