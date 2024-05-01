import cron from 'node-cron';
import { createCompanyTrade } from '../controllers/companyTrade.controller';
// Importa las funciones necesarias
import { getAllActiveSubscriptions } from '../controllers/stripe.controllers';

cron.schedule('0 0 * * 1', async () => {
    try {
        const activeSubscriptions = await getAllActiveSubscriptions(); 

        activeSubscriptions.forEach(async (subscription) => {
            await createCompanyTrade({ tradeId: subscription.tradeId, companyId: subscription.companyId }, 5); 
        });

        console.log('Trades asignados correctamente a todas las suscripciones activas');
    } catch (error) {
        console.error('Error al asignar trades a las suscripciones activas:', error);
    }
});
