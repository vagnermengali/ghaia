import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contacts.dto';
import { UpdateContactDto } from './dto/update-contacts.dto';
import * as PdfDocument from 'pdfkit';
import * as PdfTable from 'voilab-pdf-table';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(CreateContactDto: CreateContactDto, id: string) {
    const { name } = CreateContactDto;

    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        contacts: true,
      },
    });

    const alreadyExistingContact = findUser.contacts.find(
      (elem) => elem.name === name,
    );

    if (alreadyExistingContact) {
      throw new BadRequestException('This contact already exists');
    }

    const newContact = await this.prisma.contacts.create({
      data: { ...CreateContactDto, userId: id },
    });
    return newContact;
  }

  async findOne(id: string) {
    const contact = await this.prisma.contacts.findUnique({ where: { id } });

    if (!contact) {
      throw new NotFoundException('Contact does not exists!');
    }

    return contact;
  }

  async findAllContactsByUserId(id: string) {
    const findUserWithContacts = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        contacts: true,
      },
    });
    return { ...findUserWithContacts, password: undefined };
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const { name, email, telephone } = updateContactDto;
    const contact = await this.prisma.contacts.findUnique({ where: { id } });

    if (!contact) {
      throw new NotFoundException('Contact does not exists!');
    }

    const contactUpdate = await this.prisma.contacts.update({
      where: { id },
      data: { name, email, telephone },
    });

    return contactUpdate;
  }

  async delete(id: string) {
    const deleteById = await this.prisma.contacts.findUnique({
      where: {
        id,
      },
    });

    if (!deleteById) {
      throw new NotFoundException('Contact does not exists!');
    }

    await this.prisma.contacts.delete({
      where: {
        id,
      },
    });

    return deleteById;
  }

  async findAllContactsPdf(id: string) {
    console.log(id)
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        contacts: true,
      },
    });
   
    
    const contactsArray = Object.values(user.contacts);

    const pdf = new PdfDocument({ autoFirstPage: false }),

      table = new PdfTable(pdf);

    table

      .addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
        column: 'description'
      }))
      .onHeaderAdd(tb => {
        pdf
          .fillColor('#202124')
          .fontSize(8)
      })

      .setColumnsDefaults({
        padding: [5, 5, 5, 0],
        headerBorder: 'TB',
        border: 'B',
      })


    table
      .addColumns([

        {
          id: 'name', header: ' \nName\n ', width: 150, height: 20, renderer(tb, data, draw) {
            tb.pdf.fillColor('#666668')
            return data.name;
          }
        },
        { id: 'email', header: ' \nEmail\n ', width: 150, height: 20 },
        { id: 'telephone', header: ' \nTelephone\n ', width: 100, height: 20 },
        { id: 'created_at', header: ' \nAdding in\n ', width: 70, height: 20, align: 'center' }
      ])


      .onPageAdded(function (tb) {
        tb.addHeader();
      });

    pdf.addPage();

    pdf.fontSize(14).font('Helvetica-Bold').text(`User information`).font('Helvetica')

    pdf.moveDown(1);

    pdf.fontSize(10).font('Helvetica').text(`Name: ${user.username}`)
    pdf.moveDown(1);
    pdf.fontSize(10).font('Helvetica').text(`Email: ${user.email}`)
    pdf.moveDown(1);
    pdf.fontSize(10).font('Helvetica').text(`Telephone: ${user.telephone}`)

    pdf.moveDown(2);

    pdf.fontSize(14).font('Helvetica-Bold').text(`Report of all your contacts for user`).font('Helvetica')

    pdf.moveDown(1);

    table.addBody(
      contactsArray.map(contact => ({
        name: contact.name,
        email: contact.email,
        telephone: contact.telephone,
        created_at: new Date(contact.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      })),
    )

    pdf.end();

   return pdf
  }

}