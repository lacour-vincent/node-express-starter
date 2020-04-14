import app from './app';
import { connectMongoDB } from './config/mongoose';

const start = async () => {
    await connectMongoDB();
    app.listen(app.get('port'), () => {
        console.log(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
        console.log('  Press CTRL-C to stop\n');
    });
};

start();
