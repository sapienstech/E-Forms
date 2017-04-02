import { TransformationService } from './transformation.service';
import { Manifest } from '../../model/manifest';
import { FormSchema } from '../../model/form-schema';
import { FormLayout } from '../../model/form-layout';

describe('Transformation Service', () => {

    const manifest: Manifest = <Manifest>{
        'asset': [
            {
                'asset': [
                    {
                        'group': {
                            'factType': [
                                {
                                    'validValues': {
                                        'value': [
                                            '1',
                                            '2',
                                            '3',
                                            '4',
                                            '5'
                                        ]
                                    },
                                    'name': 'ListAmount',
                                    'modelMapping': 'ListAmount',
                                    'dataType': 'AMOUNT',
                                    'isPersistent': true,
                                    'isConclusion': false,
                                    'isList': true,
                                    'factTypeDefinition': 1016685
                                },
                                {
                                    'name': 'conc3',
                                    'modelMapping': 'conc3',
                                    'dataType': 'INDICATOR',
                                    'isPersistent': true,
                                    'isConclusion': true,
                                    'isList': false,
                                    'factTypeDefinition': 1016173
                                },
                                {
                                    'name': 'cond3',
                                    'modelMapping': 'cond3',
                                    'dataType': 'DATE',
                                    'isPersistent': true,
                                    'isConclusion': false,
                                    'isList': false,
                                    'factTypeDefinition': 1016188
                                }
                            ],
                            'name': 'Root'
                        },
                        'assetType': 'DECISION',
                        'name': 'Determine conc3 (View: Base)',
                        'view': 'Base',
                        'version': '1.0',
                        'conclusion': 'conc3'
                    }
                ],
                'group': {
                    'factType': [
                        {
                            'name': 'ListAmount',
                            'modelMapping': 'ListAmount',
                            'dataType': 'AMOUNT',
                            'isPersistent': true,
                            'isConclusion': false,
                            'isList': true,
                            'factTypeDefinition': 1016685
                        },
                        {
                            'name': 'conc3',
                            'modelMapping': 'conc3',
                            'dataType': 'TEXT',
                            'isPersistent': false,
                            'isConclusion': true,
                            'isList': false,
                            'factTypeDefinition': 1016173
                        },
                        {
                            'name': 'cond3',
                            'modelMapping': 'cond3',
                            'dataType': 'DATE',
                            'isPersistent': true,
                            'isConclusion': false,
                            'isList': false,
                            'factTypeDefinition': 1016188
                        },
                        {
                            'name': 'conc4',
                            'modelMapping': 'conc4',
                            'dataType': 'INDICATOR',
                            'isPersistent': true,
                            'isConclusion': true,
                            'isList': false,
                            'factTypeDefinition': 1016226
                        },
                        {
                            'name': 'cond4',
                            'modelMapping': 'cond4',
                            'dataType': 'TEXT',
                            'isPersistent': true,
                            'isConclusion': false,
                            'isList': false,
                            'factTypeDefinition': 1016241
                        },
                        {
                            'validValues': {
                                'value': [
                                    '1',
                                    '2',
                                    '3'
                                ]
                            },
                            'name': 'conclusion number 1',
                            'modelMapping': 'conc1',
                            'dataType': 'TEXT',
                            'isPersistent': true,
                            'isConclusion': true,
                            'isList': false,
                            'factTypeDefinition': 1016111
                        },
                        {
                            'name': 'cond1',
                            'modelMapping': 'cond1',
                            'dataType': 'TEXT',
                            'isPersistent': true,
                            'isConclusion': false,
                            'isList': false,
                            'factTypeDefinition': 1016126
                        },
                        {
                            'name': 'conc2',
                            'modelMapping': 'conc2',
                            'dataType': 'TEXT',
                            'isPersistent': true,
                            'isConclusion': true,
                            'isList': false,
                            'factTypeDefinition': 1016142
                        },
                        {
                            'name': 'condition 2',
                            'modelMapping': 'cond2',
                            'dataType': 'TEXT',
                            'isPersistent': true,
                            'isConclusion': false,
                            'isList': false,
                            'factTypeDefinition': 1016157
                        },
                        {
                            'name': 'testOutput2',
                            'modelMapping': 'testOutput2',
                            'dataType': 'TEXT',
                            'isPersistent': true,
                            'isConclusion': false,
                            'isList': false,
                            'factTypeDefinition': 1021064
                        },
                        {
                            'name': 'testOutput1',
                            'modelMapping': 'testOutput1',
                            'dataType': 'TEXT',
                            'isPersistent': true,
                            'isConclusion': false,
                            'isList': false,
                            'factTypeDefinition': 1021053
                        }
                    ],
                    'name': 'Root'
                },
                'assetType': 'FLOW',
                'name': 'Test-1.0',
                'version': '1.0'
            }
        ],
        'executionModelHash': 'bc776b36d503cea5f1353bdbc67347b0',
        'release': 'Sample Release',
        'tag': 'test3',
        'conclusion': 'Test'
    };

    const layout: FormLayout = <FormLayout>{
        'fieldsets': [{
            'title': 'title1',
            'fields': ['ft_1', 'ft_2']
        }],
        'collapsible': true,
        'required': ['ft_1'],
        'dependencies': [{
            'fields': ['ft_1'],
            'dependentOn': 'ft_2',
            'value': 'X'
        }]
    };

    const formMetaData: FormSchema = <FormSchema>{
        'type': 'object',
        'properties': {
            'ft_1': { 'type': 'string', 'description': 'fact type 1' },
            'ft_2': { 'type': 'string', 'description': 'fact type 2' },
            'ft_3': { 'type': 'integer', 'description': 'fact type 3' },
            'ft_6': { 'type': 'string', 'format': 'date', 'description': 'fact type date' }
        }
    };

    let service: TransformationService;

    beforeEach(() => {
        service = new TransformationService();
    });

    describe('When transforming manifest to form schema element', () => {
        let form: FormSchema;

        beforeEach(() => {
            form = service.transformToFormSchema(manifest);
        });

        it('should transform array FT to array form element with items field initialized', () => {
            expect(form).toBeDefined();
            expect(form.properties['ListAmount']).toBeDefined();
            expect(form.properties['ListAmount'].type).toBe('array');
            expect(form.properties['ListAmount'].description).toBe('ListAmount');
            expect(form.properties['ListAmount'].items).toBeDefined();
        });

        it('should transform date FT to date form element', () => {
            expect(form.properties['cond3']).toBeDefined();
            expect(form.properties['cond3'].type).toBe('string');
            expect(form.properties['cond3'].format).toBe('date');
            expect(form.properties['cond3'].description).toBe('cond3');
            expect(form.properties['cond3'].items).toBeUndefined();
        });

        it('should transform string FT to string form element', () => {
            expect(form.properties['cond2']).toBeDefined();
            expect(form.properties['cond2'].type).toBe('string');
            expect(form.properties['cond2'].description).toBe('condition 2');
            expect(form.properties['cond2'].items).toBeUndefined();
        });

        it('should not include non persistent FT in the form metadata', () => {
            expect(form.properties['conc3']).toBeUndefined();
        });

        it('should transform boolean FT to boolean form element', () => {
            expect(form.properties['conc4']).toBeDefined();
            expect(form.properties['conc4'].type).toBe('boolean');
            expect(form.properties['conc4'].description).toBe('conc4');
        });


        it('should transform FT with valid values to form element with oneOf field', () => {
            expect(form.properties['conc1']).toBeDefined();
            expect(form.properties['conc1'].type).toBe('string');
            expect(form.properties['conc1'].description).toBe('conclusion number 1');
            expect(form.properties['conc1'].items).toBeUndefined();
            expect(form.properties['conc1'].oneOf.length).toBe(3);
        });

    });

    describe('When merging layout with the form metadata', () => {
        let form: FormSchema;
        beforeEach(() => {
            form = service.mergeLayoutWithSchema(formMetaData, layout);
        });

        it('should create fieldSet for each section declared', () => {
            expect(form.fieldsets.length).toBe(layout.fieldsets.length);
        });

        it('should add collapsible widget when in the layout collapsible field is true', () => {
            expect(form.widget).toBe('collapsible');
        });

        it('should add required fields as declared in the layout', () => {
            expect(form.required.length).toBe(layout.required.length);
        });

        it('should add visibleIf field on every source field declared in the layout dependencies array', () => {
            expect(form.properties['ft_1'].visibleIf).toBeDefined();
        });
    });


});



