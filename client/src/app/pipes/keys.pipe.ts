import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    transform(value, _args: string[]): any {
        if(!value) return null;

        let keys = [];
        for (let i = 0, valueKeys = Object.keys(value); i < valueKeys.length; i++) {
            let key = valueKeys[i];
            keys.push({key: key, value: value[key]});
        }
        keys = keys.sort((a,b)=>{
            return a.key.localeCompare(b.key);
        });
        return keys;
    }
}
