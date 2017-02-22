# Process Configuration - Design

Describes the process configuration design, including basic required features.

## Processes

1. Each process is a collection of one or more steps

1. Each step will be associated with a DE flow

1. A step can be one of three types:

    1. __UI Step__

        Displays a form, then executes a flow using collected input and returns any results.

    1. __Execution Step__

        Executes a flow using any provided inputs and returns any results

    1. __Async Execution Step__

        Executes a flow using any provided inputs and returns immediately, without waiting for any results

1. All steps can receive previous results as input, which will be merged with any collected inputs

1. UI Steps will display any errors from excuting its associated flow:

    1. Execution Errors - an error indicating that a flow could not be executed: Missing Expected Input, Unexpected Input, Unexpected Error, etc.

    1. Validation Errors - a valid response that indicates that there are values that could not be validated: Invalid Value, Unknown Value, Unexpected Value, etc.

## Schema

A configuration file will contain a list of available processes:

```json
{
    "processes": []
}
```

Each process object will include:

- title - descriptive name
- description - optional description that defines additional details
- steps - list of steps and their associated flows

```json
{
    "title": "Simple Process",
    "description": "A simple process for documentation",
    "steps": []
}
```

A step defines which flow to execute, and if and how the UI will be updated:

- flow - a unique identifier for a flow
- type - the type of step: "ui" (default), "execute", "async"
- validation - optional validation configuration

```json
{
    "flow": "flow_123",
    "type": "ui",
    "validation": {}
}
```

Validation defines that a flow's response should be treated as a validation response:

- conclusion - the fact type name of a conclusion to expect the validation response
- valid - the value that indicates validation success
- invalid - the value that indicates validation failure

```json
{
    "conclusion": "ValidationFactTypeName",
    "valid": "VALID"
}
```

or

```json
{
    "conclusion": "ValidationFactTypeName",
    "invalid": "INVALID"
}
```

## Controller

The controller component is responsible for enabling process selection, and controlling a process through the various steps.

1. Display a Process Selection page

2. Populates the page with the names of available processes

3. Accesses the configuration data (manifest and layout) for each step in a process

4. Displays the UI required for a step based on step configuration

5. Executes a flow using collected inputs

6. Displays execution or validation errors appropriately

7. Repeats 3-6 for subsequent steps, providing result data from previous step to next step

8. Displays a "thank you" page on process completion
