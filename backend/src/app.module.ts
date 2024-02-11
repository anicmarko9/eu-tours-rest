import { Module } from '@nestjs/common';

import { BaseModule } from '@Base/base.module';
import { CoreModule } from '@Core/core.module';
import { UtilModule } from '@Utils/util.module';
import { TaskModule } from '@Tasks/task.module';

@Module({ imports: [BaseModule, CoreModule, UtilModule, TaskModule] })
export class AppModule {}
