import { ManifestTransformerService } from './manifest-transformer.service';
import { FactType, FormSchema } from '../../types/types';

describe('Controller Service', () => {
  let service: ManifestTransformerService;

  beforeEach(() => {
    service = new ManifestTransformerService();
  });

  it('should transform manifest to form schema element', () => {

    let manifest = require('./manifest.json');
    let form :FormSchema = service.transformToFormSchema(manifest);
    expect(form).toBeDefined();
    expect(form.properties['ListAmount']).toBeDefined();
    expect(form.properties['ListAmount'].type).toBe('array');
    expect(form.properties['ListAmount'].description).toBe('ListAmount');
    expect(form.properties['ListAmount'].items).toBeDefined();

    expect(form.properties['cond3']).toBeDefined();
    expect(form.properties['cond3'].type).toBe('string');
    expect(form.properties['cond3'].format).toBe('date');
    expect(form.properties['cond3'].description).toBe('cond3');
    expect(form.properties['cond3'].items).toBeUndefined();

    expect(form.properties['cond2']).toBeDefined();
    expect(form.properties['cond2'].type).toBe('string');
    expect(form.properties['cond2'].description).toBe('condition 2');
    expect(form.properties['cond2'].items).toBeUndefined();

    expect(form.properties['conc3']).toBeUndefined();

    expect(form.properties['conc4']).toBeDefined();
    expect(form.properties['conc4'].type).toBe('boolean');
    expect(form.properties['conc4'].description).toBe('conc4');

    expect(form.properties['conc1']).toBeDefined();
    expect(form.properties['conc1'].type).toBe('string');
    expect(form.properties['conc1'].description).toBe('conclusion number 1');
    expect(form.properties['conc1'].items).toBeUndefined();
    expect(form.properties['conc1'].oneOf.length).toBe(3);
  });


});
