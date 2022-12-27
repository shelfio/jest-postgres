create schema test;

create table test.model1
(
  id         varchar(36) not null,
  type       text,
  text       text,
  vector     double precision[],
  json       jsonb,
  updated_at timestamp,
  someBool   bool,
  constraint message
    primary key (id)
);

create index some_cool_index on test.model1 using btree (id);
