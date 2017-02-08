import { ControllerService } from './controller.service';

describe('Controller Service', () => {
    let service: ControllerService;

    beforeEach(() => {
        service = new ControllerService();
    });

    it('should supply a list of processes', () => {
        const processes = service.getProcesses();

        expect(processes).toBeDefined();
        expect(processes instanceof Array).toBe(true);
    });

    it('should include the title of a process', () => {
        const process = service.getProcesses()[0];

        expect(process.title).toBeDefined();
    });

    it('should include the description of a process if available', () => {
        const process = service.getProcesses()[1];

        expect(process.description).toBeDefined();
    });

});
