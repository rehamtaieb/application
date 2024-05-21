package tn.esprit.rh.achat;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import tn.esprit.rh.achat.entities.Facture;
import tn.esprit.rh.achat.entities.Reglement;
import tn.esprit.rh.achat.repositories.FactureRepository;
import tn.esprit.rh.achat.repositories.ReglementRepository;
import tn.esprit.rh.achat.services.FactureServiceImpl;
import tn.esprit.rh.achat.services.ReglementServiceImpl;

import java.util.Date;
import java.util.Optional;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

@ExtendWith(MockitoExtension.class)
public class ReglementTest {
    @Mock
    ReglementRepository reglementRepository;

    @InjectMocks
    ReglementServiceImpl reglementServiceMock;
    @Mock
    FactureRepository factureRepository;

    @InjectMocks
    FactureServiceImpl factureServiceMock;
    @Test
    public void testAddReglementMockito(){

        Reglement reglement = new Reglement();
        reglement.setMontantPaye(5000);
        reglement.setMontantRestant(200);
        Mockito.when(reglementRepository.save(reglement)).thenReturn(reglement);

        Assertions.assertNotNull(reglementServiceMock.addReglement(reglement));

    }
    @Test
    public void testRetreiveReglementMockito(){

        Reglement reglement = new Reglement();
        reglement.setMontantPaye(5000);
        reglement.setMontantRestant(200);
        Mockito.when(reglementRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(reglement));
        Reglement reglement1 = reglementServiceMock.retrieveReglement(1L);
        Assertions.assertNotNull(reglement1);

    }
    @Test
    public void testRetrieveReglementByFactureMockito() {
        Facture f = new Facture();
        f.setMontantFacture(500);
        f.setMontantRemise(200);
        Mockito.when(factureRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(f));
        Facture f1 = factureServiceMock.retrieveFacture(1L);
        Assertions.assertNotNull(reglementServiceMock.retrieveReglementByFacture(f1.getIdFacture()));

    }
    @Test
    public void testGetChiffreAffaireEntreDeuxDate(){

        Date startDate = new Date();
        Date endDate = new Date();

        Reglement reglement = new Reglement();
        reglement.setMontantPaye(5000);
        reglement.setMontantRestant(200);
        reglementRepository.save(reglement);

        Reglement reglement1 = new Reglement();
        reglement1.setMontantPaye(5000);
        reglement1.setMontantRestant(200);
        reglementRepository.save(reglement);

        Mockito.when(reglementRepository.getChiffreAffaireEntreDeuxDate(startDate, endDate)).thenReturn(10000F);
        Assertions.assertEquals(10000F,reglementRepository.getChiffreAffaireEntreDeuxDate(startDate,endDate));

    }

}
