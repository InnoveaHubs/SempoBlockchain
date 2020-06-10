"""empty message

Revision ID: 67630b2085b4
Revises: 829b765d9c92
Create Date: 2020-06-09 20:11:58.787106

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '67630b2085b4'
down_revision = '829b765d9c92'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('synchronized_block')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('synchronized_block',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('authorising_user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('created', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('updated', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.Column('block_number', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('synchronization_filter_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('status', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['synchronization_filter_id'], ['synchronization_filter.id'], name='synchronized_block_synchronization_filter_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='synchronized_block_pkey')
    )
    # ### end Alembic commands ###