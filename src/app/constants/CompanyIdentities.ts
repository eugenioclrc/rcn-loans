import { Agent } from '../../environments/environment';
import { CompanyIdentity } from './../models/identity.model';

export const companyIdentities = {
    [Agent.RipioCreator]: new CompanyIdentity(
            'Ripio',
            'Ripio is one of the leading Bitcoin wallets in Latin America. ... Ripio is offering its services across several Latin American countries.',
            '../../assets/img/logo-ripio-white.svg',
            new Date()
        )
};
