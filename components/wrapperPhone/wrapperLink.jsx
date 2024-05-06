import React from 'react';
import Image from "next/image";

import wt from "../../public/wtBurger.svg";
import tg from "../../public/tgBurger.svg";

import classes from "./wrapperLink.module.css";

export const WrapperPhone = ({whatsAppNumber, phoneNumber, telegramNumber}) => (
    <div className={classes.wrapperLink}>
        <a href={`tel:${whatsAppNumber}`}>
            {phoneNumber}
        </a>
        <a href={`https://api.whatsapp.com/send?phone=${whatsAppNumber}`} style={{display: 'flex'}}>
            <Image alt={'wt'} src={wt}/>
        </a>
        <a href={`https://t.me/${telegramNumber}`} style={{display: 'flex'}}>
            <Image alt={'tg'} src={tg}/>
        </a>
    </div>
);

export const WrapperMail = ({email}) => (
    <div className={classes.wrapperLink}>
        <a href={`mailto:${email}`}
           target={'_blank'}
           rel={'noopener noreferrer'}>
            {email}
        </a>
    </div>
);