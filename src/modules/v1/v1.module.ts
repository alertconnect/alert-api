import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';

import { SectorsModule } from './sector/sectors.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [{ path: '/sectors', module: SectorsModule }],
  },
];

@Module({
  imports: [RouterModule.register(routes), SectorsModule],
})
export default class V1Module {}
