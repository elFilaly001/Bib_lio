import { BadRequestException } from '@nestjs/common';

async function Exist(Model: any, fields: Object, shouldExist: boolean): Promise<Boolean> {
    try {

        const DataExist = await Model.findOne(fields);

        const fieldEntries = Object.entries(fields)
            .map(([key, value]) => `${key}`)
            .join(' or/and ');
        if (!shouldExist) {
            if (DataExist) {
                throw new BadRequestException(`already exists: ${fieldEntries}`);
            }
        } else {
            if (!DataExist) {
                throw new BadRequestException(`Expectes ${fieldEntries}`);
            }
        }

        return true;
    } catch (error) {
        throw error;
    }

}

export { Exist }; 