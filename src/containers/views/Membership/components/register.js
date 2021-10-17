import React, { useEffect, useState } from 'react';
import { Col, Form, notification, DatePicker, Select } from 'antd';
import moment from 'moment';

// import { ReactComponent as UserSvg } from '../../../common/images/user.svg';
// import { ReactComponent as PhoneSvg } from '../../../common/images/phone.svg';
// import { ReactComponent as AddressSvg } from '../../../common/images/address.svg';
// import { ReactComponent as EmailImgSvg } from '../../../common/images/email.svg';
// import { ReactComponent as ShieldUserSvg } from '../../../common/images/shieldUser.svg';
// import { ReactComponent as EyeOpenSvg } from '../../../common/images/eyeOpen.svg';
// import { ReactComponent as EyeCloseSvg } from '../../../common/images/eyeClose.svg';
import { FooterButtonWrapper } from '../styled';
import ButtonComponent from '../../../../common/components/Button';
import InputComponent from '../../../../common/components/WelcomeInput';
import SelectComponent from '../../../../common/components/WelcomeSelect';
import { ToastContainer, toast } from 'react-toastify';
import i18n from '../../../../i18n';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../../../services/firebase';

import MD5 from 'crypto-js/md5';
import { GENDER, STATUS } from '../../../../constants/const';

const Register = () => {
    const [sendForm] = Form.useForm();
    const userData = useSelector(
        ({ authReducer }) => authReducer.authUser.user
    );
    const history = useHistory();
    const notifyError = () => toast.error(i18n.t('error'));
    const address = String(auth.currentUser.email).trim().toLowerCase() || '';
    const hash = MD5(address).toString();

    const handleSubmit = () => {
        sendForm.validateFields(['nickName', 'birthday', 'gender']).then(() => {
            const dataForm = sendForm.getFieldsValue();
            try {
                const uid = userData.uid;
                db.ref('users/' + uid).set({
                    nickName: dataForm.nickName,
                    birthday: moment(dataForm.birthday).format('DD/MM/YYYY'),
                    gender: dataForm.gender,
                    avatar: `https://www.gravatar.com/avatar/${hash}`, //randomly generated
                    status: STATUS.AVAILABLE,
                    uid: uid
                });
                history.push('/conversationListItem');
            } catch (error) {
                notifyError();
            }
        });
    };

    return (
        <div>
            <ToastContainer />
            <Col md={12} xs={24} align="start" justify="space-between">
                <Form
                    form={sendForm}
                    name="sendForm"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    requiredMark={false}
                    validateMessages={{ required: 'test' }}
                >
                    <Form.Item
                        name={`nickName`}
                        initialValue=""
                        rules={[
                            {
                                required: true,
                                message: 'not be empty'
                            }
                        ]}
                    >
                        <InputComponent
                            placeholder={'Nickname'}
                            // prefix={<UserSvg />}
                            type="text"
                            // suffix={unitsData[i.unit] || ""}
                        />
                    </Form.Item>
                    <Form.Item
                        name={`birthday`}
                        initialValue=""
                        rules={[
                            {
                                required: true,
                                message: 'not be empty'
                            }
                        ]}
                    >
                        <DatePicker
                            style={{ width: '100%', 'border-radius': '20px' }}
                            format="DD/MM/YYYY"
                            placeholder="Select date of birth"
                        />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: 'not be empty'
                            }
                        ]}
                    >
                        <SelectComponent placeholder={'Gender'}>
                            <Select.Option value={GENDER.MALE}>
                                Male
                            </Select.Option>
                            <Select.Option value={GENDER.FEMALE}>
                                Female
                            </Select.Option>
                        </SelectComponent>
                    </Form.Item>
                </Form>

                <FooterButtonWrapper>
                    <ButtonComponent onClick={handleSubmit}>
                        Enter
                    </ButtonComponent>
                </FooterButtonWrapper>
            </Col>
        </div>
    );
};
export default Register;
